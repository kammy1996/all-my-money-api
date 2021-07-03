const mongoose = require(`mongoose`);

const User = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  email : { 
    type:String,
    required:true,
  },
  type: {
    type: String,
    required:true,
  },
  password: {
    type:String,
    required:true
  },
  verified: {
    type:Boolean,
    required: true,
    default:false
  }
},{ versionKey: false })


const modal = mongoose.model('user',User);

module.exports = modal;