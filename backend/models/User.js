const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // ป้องกันไม่ให้ตั้งชื่อแอดมินซ้ำกัน
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
