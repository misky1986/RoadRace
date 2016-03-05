var express = require('express');

var routes = function (Race) {
    var raceRouter = express.Router();
    var raceController = require('../Controllers/raceController')(Race);
    raceRouter.route('/')
        .post(raceController.post)
        .get(raceController.get);

    raceRouter.use('/:raceId', function (req, res, next) {
        Race.findById(req.params.raceId, function (err, race) {
            if (err) {
                res.status(500).send(err);
            } else if (race) {
                req.race = race;
                next();
            } else {
                res.status(404).send('no race found');
            }
        });
    });
    raceRouter.route('/:raceId')
        .get(function (req, res) {

            var returnedRace = req.race.toJSON();

            returnedRace.links = {};
            var newLink = 'http://' + req.headers.host + '/api/races/?rider=' + returnedRace.rider;
            returnedRace.links.filterByRider = newLink.replace(' ', '%20');
            res.json(returnedRace);
        })
        .put(function (req, res) {
            req.race.title = req.body.title;
            req.race.rider = req.body.rider;
            req.race.riderType = req.body.riderType;
            req.race.read = req.body.read;
            req.race.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.race);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.race[p] = req.body[p];
            }
            req.race.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.race);
                }
            });
        })
        .delete(function (req, res) {
            req.race.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });
    return raceRouter;
};

module.exports = routes;