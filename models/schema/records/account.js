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
  typeIcon: { 
    type:String,
    required:true,
  }, 
  balance: {
    type:Number,
  },
  currency: {
    type:String,
    required:true
  },
  lastUpdated: { 
    type:Date,
    default:Date.now()
  },
  userId: {
    type:String,
    required:true
  }
})

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model(`RecordAccount`,accountSchema);