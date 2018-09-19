import React, { Component } from 'react';
import Clear from './img/Clear.png';
import Clouds from './img/Clouds.png';
import Rain from './img/Rain.png';
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

componentDidMount(){
this.fetchForecast();
};

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
    return (
    <div className="weatherDetailCard" key={i}>
    <p>{period.dt_txt.substring(0,10)} </p>
    <p>kl. {period.dt_txt.substring(11,16)} </p>
    <h1>{(period.main.temp-273.15).toFixed(1)} C</h1>
    <p>{period.wind.speed.toFixed(0)} m/s</p>
    <p>{period.weather[0].main}</p>
    </div>
  )});

    return (
      <div className="mainContainer">
        <div className="topContainer">
        <button onClick={this.fetchData}>Prognos</button>
        <button onClick={this.fetchForecast}>Forecast</button>
        <input type="text" name="city" onChange={this.handleChange} value={city} />
        </div>
        <div className="weatherCard">
          {listForecast}
        </div>
      </div>
    );
  }
}

export default Weather;
