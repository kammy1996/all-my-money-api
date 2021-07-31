const router = require(`express`).Router();
const verifyToken = require('../helpers/verifyToken');
const recordController = require('../controllers/records')

router.post('/account', verifyToken, recordController.addAccount)
router.put('/account', verifyToken, recordController.updateAccount)
router.delete('/account', verifyToken, recordController.deleteAccount)
router.get('/account', verifyToken, recordController.getAccounts)

module.exports = router;