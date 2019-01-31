const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const AQI = require('./Schema/schema');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://rishabh:jain1234@ds021989.mlab.com:21989/aqi_db';
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}



const cityname = ["delhi","jaipur","mumbai","hyderabad","pune","bengaluru","kolkata","ahmedabad"];

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });
mongoose.connection.once('open',() =>{
    console.log("Connected to database");
});

setInterval(function(){
cityname.forEach(function(CITY){
  axios.get('https://api.waqi.info/feed/'+CITY+'/?token=41a54a2c21a382c2bf9fc1837bb22f3fa9eab75d')
  .then(response => {
      console.log(response.data.data.aqi);
      console.log(response.data.data.city.name);
      var aqis = new AQI({
          city: response.data.data.city.name,
          aqi: response.data.data.aqi,
          time: response.data.data.time.s,
          lat: response.data.data.city.geo[0],
          long: response.data.data.city.geo[1]
      });
      aqis.save();
      console.log("Data Saved!")
    })
    .catch(error => {
      console.log(error);
    });
});
}, 3600000);

  app.get('/api/show', (req,res) =>{
    res.setHeader('Content-Type', 'application/json');
    AQI.find({},function(err,doc){
        var docs = [];
    
        doc.forEach(function(value,i) {
          docs[i] = value;
        });
        res.send(docs);  
    })
});

app.get('/api/querydata', (req,res) =>{
 var CITYNAME = req.query.cityname;
 console.log(CITYNAME);
 AQI.find({city: CITYNAME},function(err,doc){
   var queriedData = [];

   doc.forEach(function(value,i){
     queriedData[i] = value;
   });
   res.send(queriedData);
 })
});

app.listen(port, () => console.log(`Listening on port ${port}`));