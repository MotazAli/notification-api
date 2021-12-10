const mongoose = require('mongoose')
await mongoose.connect('mongodb://localhost:27017/test')
module.exports = mongoose