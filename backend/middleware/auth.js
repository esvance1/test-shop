// backend/middleware/auth.js
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'my_super_secret_key_2026' // ต้องตรงกับไฟล์ routes/auth.js นะครับ

const verifyToken = (req, res, next) => {
  // 1. รับ Token จาก Header ที่ Frontend ส่งมา
  const authHeader = req.header('Authorization')

  // ถ้าไม่มีการแนบ Token มาเลย (ไม่ได้ล็อคอิน)
  if (!authHeader) {
    return res.status(401).json({ error: 'ปฏิเสธการเข้าถึง! กรุณาเข้าสู่ระบบ' })
  }

  // 2. ตัดคำว่า "Bearer " ออก เพื่อเอาแค่ตัว Token เพียวๆ
  const token = authHeader.replace('Bearer ', '')

  try {
    // 3. ตรวจสอบความถูกต้องของ Token
    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified // เก็บข้อมูลแอดมินไว้ใช้ต่อ
    next() // ผ่านได้! ให้ไปทำคำสั่งต่อไป (เช่น เพิ่ม/ลบสินค้า)
  } catch (error) {
    res.status(400).json({ error: 'Token ไม่ถูกต้อง หรือหมดอายุแล้ว' })
  }
}

module.exports = verifyToken
