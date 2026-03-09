const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// เชื่อมต่อ MongoDB (ต้องเปิด MongoDB หรือ xampp/docker ที่มี MongoDB รันอยู่ด้วยนะครับ)
mongoose
  .connect('mongodb://127.0.0.1:27017/my_shop_db')
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/products', require('./routes/products'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/banners', require('./routes/banners'))
app.use('/api/logs', require('./routes/logs'))
app.use('/api/visits', require('./routes/visits'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`)
})
