const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const responseMessages = {
	
	errorResponse: (code) => { 
		const msg = {
			'error': code
		};
		return msg;
	},

	successResponse: (code) => { 
		const msg = {
			'status': code
		};
		return msg;
	},

	orderData: (data) => {
		const msg = {
			'id': data._id,
    		'distance': data.distance,
    		'status': data.status
		};
		return msg;
	},

	getObjectId: (id) => {
		try {
			return ObjectId(id);
		} catch (err) {
			return null;
		}
	}	
    
};
  
module.exports = responseMessages;