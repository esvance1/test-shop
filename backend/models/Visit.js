const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema(
  {
    ipAddress: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Visit', visitSchema)
