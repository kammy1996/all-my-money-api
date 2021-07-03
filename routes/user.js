const router = require('express').Router();

const userController = require('../controllers/user')

router.post('/register',userController.registerUser);
router.get('/verify/:token',userController.verifyUser);
router.put('/login',userController.userLogin);

module.exports = router;
