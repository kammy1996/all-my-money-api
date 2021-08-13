const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  source : { 
    type:String,
    required:true,
  },
  type: { 
    type:String,
    required:true,
  }, 
  account: {
    type:String,
    required:true,
  },
  date: {
    type:String,
    required:true
  },
  amount: { 
    type:Number,
    required:true
  },
  category: {
    type:String,
  },
  label: {
    type:String,
  },
  note: {
    type:String,
  },
  lastUpdated: {
    type:String,
    required:true
  },
  userId: {
    type:String,
    required:true
  },
})

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

module.exports = mongoose.model(`record`,recordSchema);