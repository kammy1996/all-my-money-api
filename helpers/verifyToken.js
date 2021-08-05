const jwt = require('jsonwebtoken');

verifyToken = (req,res,next) => {
  const token = req.headers.authorization;
  if(!token) return res.status(401).send(`user Token not Provided`);
  try {
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    req.user = verified.user;
    next()
  }
  catch(err) {
    res.status(400).send(`Access Denied`)
  }
}

module.exports = verifyToken;