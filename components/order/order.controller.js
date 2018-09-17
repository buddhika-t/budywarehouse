const orderBusinessLogic = require('./order.businesslogic');
const isEmpty = require('is-empty');
const constants = require('../../lib/constants');
const { successResponse, orderData, getObjectId, errorResponse } = require('../../lib/response.messages');
const { ERROR_ORDER_PLACE_FAILED, ERROR_ORDER_NOT_FOUND, ERROR_ORDER_ALREADY_BEEN_TAKEN } = require('./order.constants');

const controller = {};

// Display detail data for a specific Order.
controller.orderDetail = async (req, res, next) => {
	try {
		const order = await orderBusinessLogic.getOrderDetail({ _id: getObjectId(req.params.id) });
		if (isEmpty(order)) {
			let response = errorResponse(ERROR_ORDER_NOT_FOUND);
			return res.status(404).json(response);
		}

		const data = orderData(order);
		return res.status(200).json(data);

	} catch (error) {
		let response = errorResponse(ERROR_ORDER_NOT_FOUND);
		res.status(400).json(response);
	}
};

// Handle order create on POST.
controller.orderCreate = async (req, res, next) => {
	try{
		let newOrder = await orderBusinessLogic.createOrder(req.body);
		const data = orderData(newOrder);
		res.status(200).json(data);
	
	  } catch (err){
		let error = errorResponse(ERROR_ORDER_PLACE_FAILED);
		res.status(500).json(error);
	  }
},

// Display list of all orders.
controller.orderList = async (req, res, next) => {
    try {
        const query = {}
        const page = req.query.page;
        const limit = +req.query.limit;
        const sort = req.query.sort;

		const orderList = await orderBusinessLogic.getOrderList(query, page, limit, sort);
		
		const reformattedData = orderList.docs.map(orderObj => { 
			let returnObj = orderData(orderObj);
			return returnObj;
		 });

        res.status(200).json(reformattedData);

    } catch (err) {
        //console.log('Error: ', error);
		let error = errorResponse(ERROR_ORDER_NOT_FOUND);
        res.status(404).json(error);
    }
}

// Handle order update on PUT.
controller.orderUpdate = async (req, res, next) => {
	try {
		const query = {
			$and: [
				{ _id: getObjectId(req.params.id) },
				{ status: { $ne: req.body.status } }
			]
		};
		const updateData = { $set: { status: req.body.status } };		
		let order = await orderBusinessLogic.updateOrder(query, updateData);
	
		if (isEmpty(order)) {
			let error = errorResponse(ERROR_ORDER_ALREADY_BEEN_TAKEN);
			return res.status(409).json(error);
		} else {
			let success = successResponse(constants.SUCCESS);
			res.status(200).json(success);
		}
	} catch (err) {
		let error = errorResponse(constants.FAIL);
		res.status(500).json(error);
	}
},

module.exports = controller;