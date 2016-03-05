var raceController = function (Race) {

    var post = function (req, res) {
        var race = new Race(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            race.save();
            res.status(201);
            res.send(race);
        }
    };

    var get = function (req, res) {
        var query = {};

        if (req.query.rider) {
            query.rider = req.query.rider;
        }

        Race.find(query, function (err, races) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnedRaces = [];
                races.forEach(function (element, index, array) {
                    var newRace = element.toJSON();
                    newRace.links = {};
                    newRace.links.self = 'http://' + req.headers.host + '/api/races/' + newRace._id;
                    returnedRaces.push(newRace);
                });

                res.json(returnedRaces);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = raceController;