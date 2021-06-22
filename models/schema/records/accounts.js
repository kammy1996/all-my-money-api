const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  color: { 
    type:String,
  },
  type: { 
    type:String,
    required:true,
  }, 
  startBalance: {
    type:Number,
  },
  currency: {
    type:String,
    required:true
  }
})

module.exports = mongoose.model(`account`,accountSchema);