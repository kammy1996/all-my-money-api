const router = require(`express`).Router();
const verifyToken = require('../helpers/verifyToken');
const recordController = require('../controllers/records')

router.post('/account', verifyToken, recordController.addAccount)

module.exports = router;