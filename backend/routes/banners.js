const express = require('express')
const router = express.Router()
const Banner = require('../models/Banner')
const verifyToken = require('../middleware/auth')

// GET: ดึงแบนเนอร์ทั้งหมด (ลูกค้าดูได้)
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 })
    res.json(banners)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// POST: เพิ่มแบนเนอร์ใหม่ (เฉพาะแอดมิน)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newBanner = new Banner({ image: req.body.image })
    await newBanner.save()
    res.json({ success: true, banner: newBanner })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add banner' })
  }
})

// PUT: แก้ไขแบนเนอร์ (อัปเดตรูปใหม่ทับรูปเดิม)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { image: req.body.image },
      { new: true },
    )
    res.json({ success: true, banner: updatedBanner })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update banner' })
  }
})

// DELETE: ลบแบนเนอร์ (เฉพาะแอดมิน)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete banner' })
  }
})

module.exports = router
