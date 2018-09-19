import React, { Component } from 'react';
require('dotenv').config();

class Weather extends Component {

  state = {
    city: 'Stockholm',
    weatherData: [],
    forecastData: [],
    forecastList: [],
  };

// Fetch data from API - Example
fetchData = () => {
// const apiUrl = `http://api.openweathermap.org/data/2.5/`;
  const apiKey = process.env.REACT_APP_APIKEY;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=`;

  fetch(apiUrl+apiKey)
    .then(response => response.json())
    .then(jsonResponse => {
      this.setState({ weatherData: jsonResponse });
      console.log(this.state.weatherData);
    });
};

// componentDidMount(){
// this.fetchForecast();
// };

fetchForecast = () => {
  const apiKey = process.env.REACT_APP_APIKEY;
  //Prognos 5dgr url
  //http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&appid={key_here}
  const fiveDaysSthlm = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=`;

  fetch(fiveDaysSthlm+apiKey)
    .then(res => res.json())
    .then(forecast => {
      this.setState({ forecastData: forecast, forecastList: forecast.list});
      console.log(this.state.forecastData);
      console.log(this.state.forecastData.list[0]);
      // console.log(this.state.forecastData.list[1].dt);
      // console.log(this.state.forecastData.list[1].main.temp);
      console.log(this.state.forecastData.city.name);
    });
};


handleChange = (event) => {
  this.setState({[event.target.name]: event.target.value})
};


  render() {
    const {weatherData, city, forecastData, forecastList} = this.state;

    const listForecast = forecastList.map((period,i) => {
    const classes=`weatherDetailCard ${period.weather[0].main.toLowerCase()}`;
    const imgSrc=`http://openweathermap.org/img/w/${period.weather[0].icon}.png`
    return (
    <div className={classes} key={i}>
    <p>{period.dt_txt.substring(0,10)} </p>
    <p>kl. {period.dt_txt.substring(11,16)} </p>
    <h2>{(period.main.temp-273.15).toFixed(1)} C</h2>
    <p>{period.wind.speed.toFixed(0)} m/s</p>
    <img src={imgSrc}/>
    </div>
  )});

    return (
      <div className="mainContainer">
        <div className="topContainer">
        <input type="text" name="city" onChange={this.handleChange} value={city} autocomplete="off"/>
        <div><button onClick={this.fetchData}>PROGNOS</button>
        <button onClick={this.fetchForecast}>FORECAST</button>
        </div>
        </div>
        <div className="weatherCardContainer">
          {listForecast}
        </div>
      </div>
    );
  }
}

export default Weather;
