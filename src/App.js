import React, { Component } from 'react';
import './App.css';

import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="appContainer">
      <Weather />
      </div>
    );
  }
}

export default App;
