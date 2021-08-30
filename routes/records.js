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
router.put('/', verifyToken, recordController.updateRecord)
router.get('/total', verifyToken, recordController.getTotalRecords);
router.get('/date-filtered', verifyToken, recordController.getRecordsAsPerDate);
router.get('/date-filtered/total', verifyToken, recordController.getTotalRecordsAsPerDate);
router.get('/filtered', verifyToken, recordController.getFilteredRecords);
router.get('/filtered/total', verifyToken, recordController.getTotalFilteredRecords);
router.get('/', verifyToken, recordController.getRecords)
router.delete('/', verifyToken, recordController.deleteRecord);

module.exports = router;