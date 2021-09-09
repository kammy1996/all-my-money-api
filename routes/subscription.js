const router = require('express').Router();
const verifyToken = require('../helpers/verifyToken');
const subscriptionController = require('../controllers/subscription')

router.post('/',verifyToken,subscriptionController.addSubscriptionCategory);
router.get('/',verifyToken,subscriptionController.getSubscriptionCategories);
router.put('/',verifyToken,subscriptionController.updateSubscriptionCategory);
router.delete('/',verifyToken,subscriptionController.deleteSubscriptionCategory);


module.exports = router;