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
  },
  lastUpdated: { 
    type:Date,
    default:Date.now()
  }
})

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model(`account`,accountSchema);