var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var raceModel = new Schema({
   title: { type: String },
   rider: {type: String},
   riderType: {type: String},
   read: {type: Boolean, default: false}
});

module.exports = mongoose.model('Race', raceModel);