const User = require('../models/schema/user/user');
const bcrypt = require('bcrypt');
const jwt = require(`jsonwebtoken`);
const sgMail = require(`@sendgrid/mail`);

exports.registerUser = async (req,res)=> {
  const user = req.body;

  await User.findOne({ email : user.email}, async (err,docs) => {
    if(err)throw err; 
    if(docs == null) {
      const hashedPass = await bcrypt.hash(user.password,10);

      const newUser = new User({
        name:user.name,
        email:user.email,
        password:hashedPass,
        type:'custom'
      })

      await newUser.save((err,docs) => {
        if(err)throw err; 

        jwt.sign(
          {user:docs._id},
          process.env.JWT_SECRET,
          {expiresIn:'10d'},
          (err,token) => {
            if(err)throw err; 

            const url = `${process.env.HOST_URL}:${process.env.PORT}/user/verify/${token}`;

            sgMail.setApiKey(process.env.SG_API_KEY);

            const msg= {
              to:user.email,
              from:process.env.SG_EMAIL,
              subject:`Verify Email - All My Money`,
              text:'Greetings from All My Money',
              html:`please Click this Link to verify your email Address <a href="${url}">Link</a>`
            }

            sgMail
            .send(msg)
            .then(() => {
              res.status(201).send(`User has been Registered and Verification Link has been sent to your Registered Email ID`)
            })
            .catch(err => {
              res.status(401).error(err)
            })
          }
        )
      })
    } else {
      res.status(401).send(`User with the same Email Address already Exist`);
    }
  })
}

exports.verifyUser = (req,res) => {
  const user = jwt.verify(req.params.token,process.env.JWT_SECRET);
  User.updateOne({ _id:user.user},{verified:true}, (err,docs) => {
    if(err)throw err; 
    res.send(`<h2>Email Verfied Please <a href="${process.env.CLIENT_URL}">Login</a></h2>`)
  })
}


exports.userLogin = async (req,res) => {
    const user = req.body;
    await User.findOne({email : user.email }, async  (err,docs) => {
      if(err)throw err; 
      if(docs == null) {
        return res.status(404).send(`User does not exist`)
      } else if(docs.verified == false) {
        return res.status(401).send(`Please Verify your Email Address before Login`);
      } else {
        const verifyPass = await bcrypt.compare(user.password,docs.password);
        if(verifyPass) {
          jwt.sign(
            {user : docs._id},
            process.env.JWT_SECRET,
            { expiresIn: '30d'}
          ,(err,token) => {
            if(err)throw err; 
            return res.status(200).json({
              userId:docs._id,
              name:docs.name,
              email:docs.email,
              token:token
            })
          });
        } else { 
          return res.status(401).send(`Please Check and Enter your Password again`);
        }
      }
    })
}
