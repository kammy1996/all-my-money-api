const router = require(`express`).Router();

const recordController = require('../controllers/records')

router.post('/account', recordController.addAccount)

module.exports = router;