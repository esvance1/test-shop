const express = require('express')
const router = express.Router()
const Log = require('../models/Log')
const verifyToken = require('../middleware/auth')

// GET: ดึงประวัติการใช้งาน (จำกัดแค่ 100 รายการล่าสุด ป้องกันเว็บอืด)
router.get('/', verifyToken, async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }).limit(100)
    res.json(logs)
  } catch (error) {
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูล Log ได้' })
  }
})

module.exports = router
