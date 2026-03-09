const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const verifyToken = require('../middleware/auth')
const Log = require('../models/Log')
const Admin = require('../models/Admin')

// 1. GET: ดึงสินค้าทั้งหมด (ทุกคนดูได้)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' }).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

// 2. GET: ดึงสินค้า 1 ชิ้น (ทุกคนดูได้)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID or DB error' })
  }
})

// 3. POST: เพิ่มสินค้าใหม่ (แอดมินเท่านั้น)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, price, image } = req.body
    if (!name || !price) return res.status(400).json({ error: 'Name and price required' })

    const newProduct = new Product({ name, description, price, image })
    const savedProduct = await newProduct.save()

    res.status(201).json({ success: true, productId: savedProduct._id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// 4. PUT: แก้ไขสินค้า (แอดมินเท่านั้น)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description, price, image } = req.body

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true },
    )

    if (!updatedProduct) {
      return res.status(404).json({ error: 'ไม่พบสินค้าที่ต้องการแก้ไข' })
    }
    res.json({ success: true, message: 'แก้ไขสินค้าเรียบร้อย' })
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขสินค้า' })
  }
})

// ลบสินค้า
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // 1. หาข้อมูลสินค้าที่จะลบก่อน เพื่อเอาชื่อไปลง Log
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'ไม่พบสินค้าในระบบ' })
    }
    const productName = product.name // แอบจำชื่อสินค้าไว้ก่อนโดนลบ

    // 2. ทำการลบสินค้า
    await Product.findByIdAndDelete(req.params.id)

    // ==========================================
    // 💥 กล้องวงจรปิด: บันทึก Log การลบสินค้า 💥
    // ==========================================
    const currentUser = await Admin.findById(req.user.id)
    const actionBy = currentUser ? currentUser.username : 'Unknown Admin'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    await new Log({
      username: actionBy,
      action: 'DELETE_PRODUCT',
      details: `ลบสินค้า: ${productName}`, // ระบุเลยว่าลบสินค้าชิ้นไหนทิ้ง
      ipAddress: ip,
    }).save()
    // ==========================================

    res.json({ success: true, message: 'ลบสินค้าสำเร็จ' })
  } catch (error) {
    console.error('Delete Product Error:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบสินค้า' })
  }
})

module.exports = router
