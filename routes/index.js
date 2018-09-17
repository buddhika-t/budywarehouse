const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

const { orderRoutes, orderController } = require('../components/order');

function canAccess(req, res, next) {
	checkAuthorization(req, function (err, authorized) {
		if (err || !authorized) {
			res.status(401).json({ message: 'Unauthorized', status: 401 });
		}
    
		logger.info('check user access');
		next();
	});

	function checkAuthorization(req, callback) {
		logger.info('jwt decode and actual authentication admin/superuser matching goes here..');

		callback(null, true);
	}
}

router.use(canAccess);

router.use('/order', orderRoutes);

// GET request for list of all Order items.
router.get('/orders', orderController.orderList);

module.exports = router;
