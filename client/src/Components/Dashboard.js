import React, { Component } from 'react'
const predict = require('./prediction')

class DashBoard extends Component {
    state = {
        cityname : '',
        queriedData: [],
        aqi: '',
        area :'',
        prediction: 0,
        poll_level: '',
        buyornot: '',
        finalprice: 0
    }

    handleSubmit = async(i)=>{
        i.preventDefault();
        const area = this.state.area;
        const val = predict.main(area);

        const response = await fetch(`/api/queryaqi?cityname=${encodeURIComponent(this.state.cityname)}`);

        console.log(response);
        console.log(this.state.area);

        const body = await response.json();
        this.setState({
            queriedData: body,
        });
        console.log(this.state.queriedData);
        console.log(this.state.prediction);
        this.setState({
            aqi: this.state.queriedData[0].aqi,
            prediction: val,
        });

        if(this.state.aqi>=0 && this.state.aqi<=50){
            this.setState({
                poll_level: 'Good',
                buyornot: 'Definitely',
                finalprice: this.state.prediction*0.15
            });
        }
        else if(this.state.aqi>=51 && this.state.aqi<=100){
            this.setState({
                poll_level: 'Satisfactory',
                buyornot: 'Definitely',
                finalprice: this.state.prediction*0.15
            });
        }
        else if(this.state.aqi>=101 && this.state.aqi<=200){
            this.setState({
                poll_level: 'Moderate',
                buyornot: 'Definitely',
                finalprice: this.state.prediction*0.15
            });
        }
        else if(this.state.aqi>=201 && this.state.aqi<=300){
            this.setState({
                poll_level: 'Poor',
                buyornot: 'Not',
                finalprice: this.state.prediction*0.05
            });
        }
        else if(this.state.aqi>=300 && this.state.aqi<=400){
            this.setState({
                poll_level: 'Very Poor',
                buyornot: 'Not',
                finalprice: this.state.prediction*0.05
            });
        }
        else if(this.state.aqi>400){
            this.setState({
                poll_level: 'Severe',
                finalprice: this.state.prediction*0.05
            });
        }
    } 

    handleSelectCity = (e) => {
        this.setState({
            cityname: e.target.value
        });
    }
    handleArea = (e) =>{
        this.setState({
            area: e.target.value
        });
    }
  render() {
    return (
      <div className="container-fluid" style={{marginTop:"100px"}}>
      <h1 className="text-primary">House Pricing Prediction</h1>
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
            <form className="form-inline row form-div">
                <select className="btn mb-2 mr-sm-2 col-lg-3" onChange={this.handleSelectCity}>
                    <option defaultValue>Select a City</option>
                    <option value="Maninagar, Ahmedabad, India">Maninagar, Ahmedabad, India</option>
                    <option value="Shivajinagar, Pune, Pune, India">Shivajinagar, Pune, Pune, India</option>
                    <option value="Mumbai US Consulate, India (मुंबई अमेरिकी वाणिज्य दूतावास, India)">Mumbai US Consulate, India (मुंबई अमेरिकी वाणिज्य दूतावास, India)</option>
                    <option value="New Delhi US Embassy, India (नई दिल्ली अमेरिकी दूतावास, India)">New Delhi US Embassy, India (नई दिल्ली अमेरिकी दूतावास, India)</option>
                    <option value="Police Commissionerate, Jaipur, India">Police Commissionerate, Jaipur, India</option>
                    <option value="City Railway Station, Bangalore, India">City Railway Station, Bangalore, India</option>
                    <option value="Hyderabad US Consulate, India (हैदराबाद अमेरिकी वाणिज्य दूतावास, India)">Hyderabad US Consulate, India (हैदराबाद अमेरिकी वाणिज्य दूतावास, India)</option>
                    <option value="Kolkata US Consulate, India (कोलकाता अमेरिकी वाणिज्य दूतावास, India)">Kolkata US Consulate, India (कोलकाता अमेरिकी वाणिज्य दूतावास, India)</option>
                </select>
                <div className="input-group mb-2 mr-sm-2 col-lg-6">
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Enter House Area"  onChange={this.handleArea}/>
                </div>
                <button className="btn btn-primary mb-2 col-lg-2" onClick={this.handleSubmit.bind(this)}>Submit</button>
            </form>
            <div className="container card-div">
                <div className="row">
                    <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">AQI Level</h4>
                            <p className="card-text">
                            {this.state.aqi > 0 ? ("AQI Level of "+ this.state.cityname + " is "+ this.state.aqi) : 
                            ("AQI Level of the selected city will be displayed here")}
                            </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">House Price</h4>
                            <p className="card-text">
                            {this.state.prediction > 0 ? ("Calculated house price for "+this.state.area+ " sq.ft is Rs."+ this.state.prediction) : 
                            ("House price according to area will be displayed here")}
                            </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Hedonic Price</h4>
                            <p className="card-text">
                            {this.state.prediction > 0 ? ("Calculated Hedonic price for "+this.state.area+ " sq.ft is Rs."+ this.state.finalprice*0.3) : 
                            ("Hedonic price according to AQI will be displayed here")}
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="container-fluid prediction-div">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Prediction</h4>
                            <p className="card-text">
                            {this.state.poll_level !='' ? ("The pollution level in this city is "+this.state.poll_level+'\nYou should '+this.state.buyornot+' buy house here') : 
                            ("Pollution Level according to aqi will be displayed here and weather you should buy house or not")}
                            </p>
                        </div>
                    </div> 
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-lg-2"></div>
        </div>
        </div>
      </div>
    )
  }
}

export default DashBoard
