const express = require('express');
const router = express.Router();

const orderController = require('./order.controller');
const orderValidator = require('./order.validator');

// GET request for one Order.
router.get('/:id', orderController.orderDetail);

// POST request for creating Order.
router.post('/', orderValidator.orderCreate, orderController.orderCreate);

// GET request to update Order.
router.put('/:id', orderValidator.orderUpdate, orderController.orderUpdate);

module.exports = router;