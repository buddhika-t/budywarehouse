const Order = require('./order.model');

/**
 * Get details of the Order
 * @param {Object} query 
 */
const getOrderDetail = (query) =>
	Order.findOne(query);

/**
 * Get all Order list on system
 * @param {Object} query 
 * @param {number} page 
 * @param {number} limit 
 * @param {Object} sort 
 */
const getOrderList = (query, page, limit, sort) => {
    let docsQuery = Order.find(query)
        .sort(sort)
        .skip(((page ? page : 1) - 1) * limit)
        .limit(limit)
        .exec();

    let countQuery = Order.countDocuments(query).exec();

    return Promise.all([docsQuery, countQuery]).then((data) => {
        const [docs, count] = data;
        let result = { docs: docs, total: count, limit: limit };

        if (page !== undefined) {
            result.page = page;
            result.pages = Math.ceil(data.count / limit) || 1;
        }

        return Promise.resolve(result);
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    });
}

/**
 * Create new Order
 * @param {Object} data 
 */
const createOrder = (data) => {
	const googleMapsClient = require('@google/maps').createClient({
		key: process.env.GOOGLE_MAPS_API_KEY,
		Promise: Promise
	});
	   
	return googleMapsClient.directions(data)
	.asPromise()
	.then((response) => {
		data.distance = response.json.routes[0].legs[0].distance.text;
		const newOrder = new Order(data);
		let result = newOrder.save();
		return Promise.resolve(result);
	})
	.catch((err) => {
		//console.log(err);
		return Promise.reject(err);
	});

};

/**
 * Update existing Order
 * @param {Object} query 
 * @param {Object} data 
 */
const updateOrder = (query, data) =>
	Order.findOneAndUpdate(query, data, {new: true});


module.exports = { getOrderDetail, getOrderList, createOrder, updateOrder };