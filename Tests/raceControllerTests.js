var should = require('should'),
    sinon = require('sinon');

describe('Race Controller Tests:', function () {

    describe('Post', function () {
        it('should not allow an empty title on post', function () {
            var Race = function (race) {
                this.save = function () {
                }
            };

            var req = {
                body: {
                    rider: 'Jon'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            var raceController = require('../controllers/raceController')(Race);
            raceController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);

        });
    });

});