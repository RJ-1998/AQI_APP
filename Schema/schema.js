var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aqiSchema = new Schema({
    city: String,
    aqi: String,
    time: String
});

module.exports = mongoose.model('AQI',aqiSchema);