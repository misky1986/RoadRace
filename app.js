var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/raceAPI');

var Race = require('./models/raceModel');

var app = express();

var port = process.env.PORT || 3000;

var raceRouter = express.Router();

raceRouter.route('/Races')
    .get(function(req, res){
        Race.find(function(err, races){
            if(err) {
                console.log(err);
            } else {
                res.json(races);
            }    
        });
    });
    
app.use('/api', raceRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function (err) {
    console.log('Gulp is running server on port ' + port);
});