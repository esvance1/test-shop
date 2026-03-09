const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Log = require('../models/Log') // 👈 นำเข้าโมเดล Log

// 💥 ใช้โมเดล Admin ตัวเดียวไปเลยครับ จะได้ไม่ตีกัน
const Admin = require('../models/Admin')
const verifyToken = require('../middleware/auth')

// 💡 แนะนำ: ในอนาคตควรย้าย Secret Key ไปไว้ในไฟล์ .env นะครับ
const JWT_SECRET = process.env.JWT_SECRET || 'my_super_secret_key_2026'

// ==========================================
// 🔐 API เข้าสู่ระบบ (Login)
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // 1. ค้นหาชื่อผู้ใช้ในฐานข้อมูล Admin
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง' })
    }

    // 2. ตรวจสอบรหัสผ่านที่เข้ารหัสไว้
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง' })
    }

    // 3. ออกบัตรผ่าน (Token) ให้ใช้งานได้ 1 วัน
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' })

    // ==========================================
    // 💥 4. บันทึกข้อมูลลง Log (กล้องวงจรปิดทำงานตรงนี้!) 💥
    // ==========================================
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    await new Log({
      username: admin.username,
      action: 'LOGIN',
      details: 'เข้าสู่ระบบสำเร็จ',
      ipAddress: ip,
    }).save()
    // ==========================================

    res.json({ success: true, token, message: 'เข้าสู่ระบบสำเร็จ' })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' })
  }
})

// ==========================================
// 🚨 กุญแจผีฉุกเฉิน: สร้างแอดมินคนแรก (ถ้าฐานข้อมูลว่างเปล่า)
// ==========================================
const createFirstAdmin = async () => {
  try {
    const count = await Admin.countDocuments()
    // ถ้าเช็คแล้วว่าไม่มีแอดมินในระบบเลยแม้แต่คนเดียว
    if (count === 0) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash('123456', salt) // รหัสผ่านตั้งต้น

      const newAdmin = new Admin({ username: 'admin', password: hashedPassword })
      await newAdmin.save()
      console.log('✅ สร้างแอดมินฉุกเฉินสำเร็จ! ใช้เข้าสู่ระบบได้เลย -> User: admin | Pass: 123456')
    }
  } catch (err) {
    console.error('สร้างแอดมินฉุกเฉินล้มเหลว:', err)
  }
}
createFirstAdmin() // สั่งให้โค้ดทำงานทันทีที่เปิดเซิร์ฟเวอร์

// ==========================================
// 🟢 API จัดการทีมงานแอดมิน (ต้องมี Token)
// ==========================================

// 1. GET: ดึงรายชื่อแอดมินทั้งหมด
router.get('/users', verifyToken, async (req, res) => {
  try {
    // ดึงข้อมูลแต่ซ่อนรหัสผ่าน (-password)
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 })
    res.json(admins)
  } catch (error) {
    console.error('Fetch Admins Error:', error)
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลแอดมินได้' })
  }
})

// 2. POST: สร้างแอดมินใหม่
router.post('/users', verifyToken, async (req, res) => {
  try {
    const { username, password } = req.body

    // เช็คซ้ำ
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return res.status(400).json({ error: 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว กรุณาใช้ชื่ออื่น' })
    }

    // เข้ารหัสผ่าน
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // บันทึกลงฐานข้อมูล Admin
    const newAdmin = new Admin({ username, password: hashedPassword })
    await newAdmin.save()

    // ==========================================
    // 💥 กล้องวงจรปิด: บันทึก Log การเพิ่มแอดมิน 💥
    // ==========================================
    // 1. หาว่าใครเป็นคนกดสร้าง (ดึงชื่อจาก id ใน Token)
    const currentUser = await Admin.findById(req.user.id)
    const actionBy = currentUser ? currentUser.username : 'Unknown Admin'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    await new Log({
      username: actionBy, // ชื่อคนกดเพิ่ม
      action: 'ADD_ADMIN',
      details: `สร้างบัญชีแอดมินใหม่ชื่อ: ${username}`, // บอกด้วยว่าสร้างใคร
      ipAddress: ip,
    }).save()
    // ==========================================

    res.status(201).json({ success: true, message: 'สร้างแอดมินใหม่สำเร็จ' })
  } catch (error) {
    console.error('Create Admin Error:', error)
    res.status(500).json({ error: 'ไม่สามารถสร้างแอดมินได้' })
  }
})

// 3. PUT: แก้ไขข้อมูลแอดมิน
router.put('/users/:id', verifyToken, async (req, res) => {
  try {
    const { username, password } = req.body
    let updateData = { username }

    // ถ้ามีการส่งรหัสผ่านใหม่มา ให้เข้ารหัสใหม่ด้วย
    if (password) {
      const salt = await bcrypt.genSalt(10)
      updateData.password = await bcrypt.hash(password, salt)
    }

    await Admin.findByIdAndUpdate(req.params.id, updateData)
    res.json({ success: true, message: 'อัปเดตข้อมูลแอดมินสำเร็จ' })
  } catch (error) {
    console.error('Update Admin Error:', error)
    res.status(500).json({ error: 'ไม่สามารถแก้ไขข้อมูลได้' })
  }
})

// 4. DELETE: ลบแอดมิน
router.delete('/users/:id', verifyToken, async (req, res) => {
  try {
    // ป้องกันการเผลอลบตัวเอง (ทางเลือกเสริม)
    if (req.user && req.user.id === req.params.id) {
      return res.status(400).json({ error: 'ไม่สามารถลบบัญชีที่กำลังใช้งานอยู่ได้' })
    }

    await Admin.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'ลบแอดมินออกจากระบบสำเร็จ' })
  } catch (error) {
    console.error('Delete Admin Error:', error)
    res.status(500).json({ error: 'ไม่สามารถลบแอดมินได้' })
  }
})

module.exports = router
