const router = require(`express`).Router();

const recordController = require('../controllers/records')

router.get('/', recordController.getRecords)

module.exports = router;