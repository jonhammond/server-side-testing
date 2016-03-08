var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all shows', function() {

        it('should get all shows', function(done) {
            chai.request(server)
            .get('/api/shows')
            .end(function(err, res) {
                console.log('res.body:',res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });

    describe('Get single show', function() {

        it('should get one show', function(done) {
            chai.request(server)
            .get('/api/show/1')
            .end(function(err, res) {
                console.log('res.body:',res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });

    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });

    describe('Add a single show', function(){
        it('should POST a show', function(done) {
            chai.request(server)
            .post('/api/shows')
            .send({
                name: 'new show',
                channel : 'ABC',
                genre: 'Anything',
                rating: 1,
                explicit: false
            })
            .end(function(err, res) {
                chai.request(server)
                .get('/api/show/' + res.body[0])
                .end(function(error, response) {
                //test code
                    response.body.should.be.a('array');
                    response.body.length.should.equal(1);
                    response.body[0].should.have.property('name');
                    response.body[0].name.should.equal('new show');
                    response.body[0].should.have.property('channel');
                    response.body[0].channel.should.equal('ABC');
                    response.body[0].should.have.property('genre');
                    response.body[0].genre.should.equal('Anything');
                    response.body[0].should.have.property('rating');
                    response.body[0].rating.should.equal(1);
                    response.body[0].should.have.property('explicit');
                    response.body[0].explicit.should.equal(false);
                    done();
                });
            });
        });
    });

    describe('Upate a single show', function(){
        xit('should update a show', function(done) {
            chai.request(server)
            .put('/api/show/1')
            .send({
                name: 'Edited Suits',
                channel : 'New Channel',
                genre: 'Drama',
                rating: 3,
                explicit: false
            })
            .end(function(err, res) {
                chai.request(server)
                .get('/api/show/' + res.body)
                .end(function(error, response) {
                    //test code to check object
                    done();
                });
            });
        });
    });

});

