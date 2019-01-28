const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const AQI = require('./Schema/schema');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cityname = 'delhi';

mongoose.connect('mongodb://rishabh:jain1234@ds021989.mlab.com:21989/aqi_db', { useNewUrlParser: true });
mongoose.connection.once('open',() =>{
    console.log("Connected to database");
});

setInterval(function(){ 
axios.get('https://api.waqi.info/feed/'+cityname+'/?token=41a54a2c21a382c2bf9fc1837bb22f3fa9eab75d')
.then(response => {
    console.log(response.data.data.aqi);
    console.log(response.data.data.city.name);
    console.log(response.data.data.time.s);
    var aqis = new AQI({
        city: response.data.data.city.name,
        aqi: response.data.data.aqi,
        time: response.data.data.time.s
    });
    aqis.save();
    console.log("Data Saved!")
  })
  .catch(error => {
    console.log(error);
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

app.listen(port, () => console.log(`Listening on port ${port}`));