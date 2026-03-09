const express = require('express')
const router = express.Router()
const Visit = require('../models/Visit')

// 1. API บันทึกคนเข้าเว็บ (นับทุกครั้งที่เปิด/รีเฟรช)
router.post('/record', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    // 💥 ลบตัวเช็คซ้ำออกไปเลย สั่งบันทึกลงฐานข้อมูลดื้อๆ เลยครับ
    await new Visit({ ipAddress: ip }).save()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
})

// 2. API ดึงสถิติ (สรุปรายวัน และ รายเดือน)
router.get('/stats', async (req, res) => {
  try {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() // 0 = ม.ค., 11 = ธ.ค.

    // ตั้งเวลาเที่ยงคืนของวันนี้ เพื่อคำนวณยอด "วันนี้"
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // ดึงข้อมูลการเข้าชมของ "ปีนี้" ทั้งหมดออกมา
    const visitsThisYear = await Visit.find({
      createdAt: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1),
      },
    })

    // เตรียมกล่องเก็บตัวเลข
    const monthlyCounts = new Array(12).fill(0) // กล่อง 12 เดือน
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate() // หาว่าเดือนนี้มีกี่วัน
    const dailyCounts = new Array(daysInMonth).fill(0) // กล่องตามจำนวนวันในเดือนนี้

    let totalToday = 0
    let totalThisMonth = 0

    // วนลูปแยกข้อมูลเข้าแต่ละกล่อง
    visitsThisYear.forEach((v) => {
      const date = new Date(v.createdAt)
      const month = date.getMonth()
      const day = date.getDate() - 1 // ลบ 1 เพื่อให้ตรงกับ index ของ Array

      // 1. นับใส่รายเดือน
      monthlyCounts[month]++

      // 2. ถ้ายอดนี้อยู่ใน "เดือนปัจจุบัน" ให้นับใส่รายวันด้วย
      if (month === currentMonth) {
        dailyCounts[day]++
        totalThisMonth++
      }

      // 3. ถ้ายอดนี้เกิดขึ้น "วันนี้"
      if (date >= todayStart) {
        totalToday++
      }
    })

    res.json({
      totalToday, // ยอดวันนี้
      totalThisMonth, // ยอดเดือนนี้
      monthlyData: monthlyCounts, // Array กราฟรายเดือน
      dailyData: dailyCounts, // Array กราฟรายวัน
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})

module.exports = router
