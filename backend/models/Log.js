const mongoose = require('mongoose')

const logSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, // ใครเป็นคนทำ
    action: { type: String, required: true }, // ทำอะไร (เช่น Login, Add Product)
    details: { type: String }, // รายละเอียดเพิ่มเติม
    ipAddress: { type: String }, // หมายเลข IP
  },
  { timestamps: true },
)

module.exports = mongoose.model('Log', logSchema)
