import React, { Component } from 'react'

class Dashboard extends Component {

    state = {
        data: [],
        queriedData: [],
        cityname: '',
        querydate: '',
        showAllResults: false,
        showSearchResults: false
    };

    componentDidMount = async () =>{
        const response = await fetch('/api/show');
        const body = await response.json();
        this.setState({
            data: body,
            showAllResults: true 
        });
        console.log(this.state.data[0]._id);
        console.log(this.state.showAllResults);
        return body;
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = async (i) =>{
        i.preventDefault();
        const response = await fetch(`/api/querydata?cityname=${encodeURIComponent(this.state.cityname)}`);
        console.log(response);
        const body = await response.json();
        this.setState({
            queriedData: body,
            showAllResults: false,
            showSearchResults: true
        });
        //console.log(this.state.queriedData);
    }
  render() {
    var items = [];
    if(this.state.showAllResults===true){      
    this.state.data.forEach(i => items.push(
        <tr key={i._id}>
                <td>{i.city}</td>
                <td>{i.time}</td>
                <td>{i.aqi}</td>
                <td>{i.lat}</td>
                <td>{i.long}</td>
            </tr>
      ));}
      else{items = [];
        this.state.queriedData.forEach(i => items.push(
            <tr key={i._id}>
                    <td>{i.city}</td>
                    <td>{i.time}</td>
                    <td>{i.aqi}</td>
                    <td>{i.lat}</td>
                    <td>{i.long}</td>
                </tr>
          ));
      }

    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
        <h1 onClick={this.componentDidMount}>View Data</h1>
        <div className="container-fluid">
        <form className="form-group my-2 my-lg-8">
            <input className="form-control mr-sm-2 search-box" type="text" name="cityname" placeholder="Search" aria-label="Search" onChange={this.handleChange}/>
            {/*<input type="date" name="querydate" className="mr-sm-2 calendar" onChange={this.handleChange}/>*/}
            <button className="btn btn-outline-dark my-2 my-sm-0" onClick={this.handleSubmit.bind(this)}>Search</button>
        </form>
        </div>
                <table className="table">
        <thead className="thead-dark">
            <tr>
            <th>City</th>
            <th>Time</th>
            <th>AQI</th>
            <th>Latitude</th>
            <th>Longitude</th>
            </tr>
        </thead>
        <tbody>
            {items}
        </tbody>
                </table>
        </div>
        <div className="col-lg-2"></div>
        </div>
      </div>
    )
  }
}

export default Dashboard
