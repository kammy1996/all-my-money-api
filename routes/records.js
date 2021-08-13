const router = require(`express`).Router();
const verifyToken = require('../helpers/verifyToken');
const recordController = require('../controllers/records')

router.post('/account', verifyToken, recordController.addAccount)
router.put('/account', verifyToken, recordController.updateAccount)
router.delete('/account', verifyToken, recordController.deleteAccount)
router.get('/account', verifyToken, recordController.getAccounts)
router.post('/category', verifyToken, recordController.addCategory)
router.put('/category', verifyToken, recordController.updateCategory)
router.get('/category', verifyToken, recordController.getCategories)
router.delete('/category', verifyToken, recordController.deleteCategory)
router.post('/label', verifyToken, recordController.addLabel)
router.get('/label', verifyToken, recordController.getLabels)
router.put('/label', verifyToken, recordController.updateLabel)
router.delete('/label', verifyToken, recordController.deleteLabel)
router.post('/', verifyToken, recordController.addRecord)

module.exports = router;