const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  color: { 
    type:String,
  },
  status: { 
    type:String,
    default:'Custom'
  },
  lastUpdated: { 
    type:Date,
    default:Date.now()
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

module.exports = mongoose.model(`label`,labelSchema);