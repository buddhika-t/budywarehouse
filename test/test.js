require('dotenv').config();
const request = require('supertest');
const app = require('../app'); //reference to you app.js file

var orderId = '';

/**
 * Testing get all order endpoint
 */
describe('warehouse order', function () {

    it('POST /order create new order & respond with json containing a order detail', function (done) {

        var data = {
            "origin": ["6.924088", "79.861046"],
            "destination": ["6.794434", "80.071912"]
        };

        request(app)
            .post("order")            
            .send(data)
            .set('Accept', 'application/json')
			.expect("Content-type", /json/)
			.expect(200)
			.end(function(err, res) {
                orderId = res.body.id;
                //console.log(res);
				done();
		    });
    });

    it('PUT /order/:id update existing order & respond with json contain status', function (done) {

        data = {
            "status":"takens"
        };

        request(app)
            .put('order/' + orderId)
            .send(data)
            .set('Accept', 'application/json')
			.expect("Content-type", /json/)
			.expect(200, done);
    });

    it('GET /orders respond with json containing a list of all orders', function (done) {
        request(app)
            .get('/orders')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

