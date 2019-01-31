var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aqiSchema = new Schema({
    city: String,
    aqi: String,
    time: String,
    lat: String,
    long: String
});

module.exports = mongoose.model('AQI',aqiSchema);