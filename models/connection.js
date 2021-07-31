const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: "true",
  useUnifiedTopology: true,
  useFindAndModify:false
})

mongoose.connection.on(`error`, err=> {
    console.log(`err`,err)
})

mongoose.connection.on(`connected`, (res,err)=> {
    console.log(`database Connected`)
})

module.exports = mongoose;