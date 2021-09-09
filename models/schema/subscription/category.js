const mongoose = require(`mongoose`);

const subsCategorySchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  name :  {
    type:String,
    required:true
  },
  icon: { 
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

module.exports = mongoose.model('subscriptionCategories',subsCategorySchema);