const { body, validationResult } = require('express-validator/check');
const constants = require('../../lib/constants');
const { errorResponse } = require('../../lib/response.messages');
const { STATUS_UNASSIGN, STATUS_TAKEN } = require('./order.constants');

const validator = {};

// Validate create order data.
validator.orderCreate = [
    // Validate fields.        	    	   	
    body('origin').exists().withMessage(constants.MISSING_MANDATORY_ATTRIBUTE),
    body('destination').exists().withMessage(constants.MISSING_MANDATORY_ATTRIBUTE),

    // Process request after validation and sanitization.
	(req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            let errorData = errors.array({ onlyFirstError: true }).shift();
            let response = errorResponse(errorData['msg']);
            res.status(400).json(response);
        } else {
            next();
        }
    }
];

// Validate update order data.
validator.orderUpdate = [
    // Validate fields.        	    	   	
    body('status').exists().withMessage(constants.MISSING_MANDATORY_ATTRIBUTE),
    body('status').isIn([STATUS_UNASSIGN, STATUS_TAKEN]).withMessage(constants.INVALID_DATA),

    // Process request after validation and sanitization.
	(req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            let errorData = errors.array({ onlyFirstError: true }).shift();
            let response = errorResponse(errorData['msg']);
            res.status(400).json(response);
        } else {
            next();
        }
    }
];


module.exports = validator;
