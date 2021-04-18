let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();
chai.use(chaiHttp);
describe('Restaurants API', () => {

    describe('Get /api/v1/restaurants', () => {
        it('It should GET all restaurants', (done) => {
            chai.request("http://localhost:3006")
                .get('/api/v1/restaurants')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.restaurants.should.be.a('array');
                    done();
                });
        });
    });

    describe('Get /api/v1/restaurants/:id', () => {
        it('It should GET a restaurant by ID', (done) => {
            const restaurantId = 77;
            chai.request("http://localhost:3006")
                .get('/api/v1/restaurants/' + restaurantId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.restaurant.should.be.a('object');
                    response.body.data.restaurant.should.have.property('id');
                    response.body.data.restaurant.should.have.property('name');
                    response.body.data.restaurant.should.have.property('location');
                    response.body.data.restaurant.should.have.property('price_range');
                    response.body.data.restaurant.should.have.property('restaurant_id');
                    response.body.data.restaurant.should.have.property('count');
                    response.body.data.restaurant.should.have.property('average_rating');
                    response.body.data.restaurant.should.have.property('id').eq('77');
                    done();
                });
        });
    });

    describe('Post /api/v1/restaurants/', () => {
        it('It should POST a new restaurant', (done) => {
            const restaurant = {
                name: "La luna",
                location: "batajnica",
                price_range: "4"
            }
            chai.request("http://localhost:3006")
                .post('/api/v1/restaurants/')
                .send(restaurant)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.data.restaurant.should.be.a('object');
                    response.body.data.restaurant.should.have.property('name').eq('La luna');
                    response.body.data.restaurant.should.have.property('location').eq('batajnica');
                    response.body.data.restaurant.should.have.property('price_range').eq(4);
                    response.body.data.restaurant.should.have.property('id');
                    done();
                });
        });
    });
    describe('Put /api/v1/restaurants/:id', () => {
        it('It should UPDATE a restaurant', (done) => {
            const restaurantId = 77;
            const restaurant = {
                name: "La luna changed",
                location: "batajnica",
                price_range: "4"
            }
            chai.request("http://localhost:3006")
                .put('/api/v1/restaurants/' + restaurantId)
                .send(restaurant)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.restaurant.should.be.a('object');
                    response.body.data.restaurant.should.have.property('name').eq('La luna changed');
                    response.body.data.restaurant.should.have.property('location').eq('batajnica');
                    response.body.data.restaurant.should.have.property('price_range').eq(4);
                    response.body.data.restaurant.should.have.property('id');
                    done();
                });
        });
    });
    describe('DELETE /api/v1/restaurants/:id', () => {
        it('It should DELETE an existing restaurant', (done) => {
            const restaurantId = 6;
            chai.request("http://localhost:3006")
                .delete('/api/v1/restaurants/' + restaurantId)
                .end((err, response) => {
                    response.should.have.status(204);
                    done();
                });

        });

    });

});