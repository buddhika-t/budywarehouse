const mongoose = require('mongoose');
const constants = require('../../lib/constants');
const { STATUS_UNASSIGN, STATUS_TAKEN } = require('./order.constants');

const orderSchema = new mongoose.Schema({
	status: {
        type: String,
		enum: [STATUS_UNASSIGN, STATUS_TAKEN],
		default: STATUS_UNASSIGN,
	},
	origin: {
		type: Object,
		required: true
	},
	destination: {
		type: Object,
		required: true
	},
	distance: {
		type: String,
		maxlength: [30, constants.EXCEED_CHARACTER_LENGTH],
		default: null
	}
}, { collection: 'order', usePushEach: true, timestamps: true, autoIndex: true });

module.exports = mongoose.model('Order', orderSchema);
