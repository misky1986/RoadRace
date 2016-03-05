var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/raceAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/raceAPI');
}


var Race = require('./models/raceModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var raceRouter = require('./routes/raceRoutes')(Race);

app.use('/api/races', raceRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function (err) {
    console.log('Gulp is running server on port ' + port);
});

module.exports = app;