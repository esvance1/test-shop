const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs') // นำเข้าโมดูลจัดการไฟล์ของ Node.js
const router = express.Router()

// 1. กำหนดชื่อโฟลเดอร์ปลายทาง
const uploadDir = 'uploads/products/'

// 2. เช็คว่ามีโฟลเดอร์นี้หรือยัง ถ้ายังไม่มีให้สร้างขึ้นมาใหม่ทันที (แก้ Error ENOENT)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 3. ตั้งค่า Multer สำหรับจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir) // ใช้ตัวแปร uploadDir ที่เราเช็คไว้ด้านบน
  },
  filename: function (req, file, cb) {
    // ตั้งชื่อไฟล์ใหม่: เวลาปัจจุบัน + สุ่มเลข + นามสกุลไฟล์เดิม
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

// 4. ตรวจสอบชนิดไฟล์ (รับเฉพาะรูปภาพ)
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Images only!'))
    }
  },
})

// 5. API สำหรับรับไฟล์จาก Frontend
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    // ส่ง Path ของรูปกลับไปให้ Frontend เพื่อเอาไปบันทึกลง Database
    res.json({ success: true, imagePath: `/${uploadDir}${req.file.filename}` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
