var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Race = mongoose.model('Race'),
    agent = request.agent(app);


describe('Book Crud Test', function () {
    it('should allow a book to be posted and return a read and _id', function (done) {
        var racePost = {title: 'New Rider', rider: 'Rider123', ryderType: 'Crazy one'};

        agent.post('/api/races')
            .send(racePost)
            .expect(200)
            .end(function (err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });

    });

    afterEach(function (done) {
        Race.remove().exec();
        done();
    });
});