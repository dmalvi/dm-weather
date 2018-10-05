import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
      <h1 className="rubrik">WeatherApp</h1>
      <p className="underRubrik">by Daniel</p>
      </div>
    );
  }
}

export default Header;
