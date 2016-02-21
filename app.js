var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/raceAPI');

var Race = require('./models/raceModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var raceRouter = express.Router();

raceRouter.route('/Races')
    .post(function(req, res) {
        var race = new Race(req.body);
        console.log(race);
        res.send(race);
    })
    .get(function(req, res){
        var query = {};
        
        if(req.query.rider) {
            query.rider = req.query.rider;
        }
            
        Race.find(query, function(err, races){
            if(err) {
                res.status(500).send(err);
          } else {
                res.json(races);
            }    
        });
    });
    
raceRouter.route('/Races/:raceId')
    .get(function(req, res){
            
        Race.findById(req.params.raceId, function(err, race){
            if(err) {
                res.status(500).send(err);
            } else {
                res.json(race);
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
