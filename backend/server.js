const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// เชื่อมต่อ MongoDB (ต้องเปิด MongoDB หรือ xampp/docker ที่มี MongoDB รันอยู่ด้วยนะครับ)
// เปลี่ยนโค้ดเป็นแบบนี้ครับ
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/testshop')
  .then(() => console.log('✅ Connected to Database'))
  .catch((err) => console.log(err))

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
