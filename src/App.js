import React, { Component } from 'react';
import LogoBanner from './LogoBanner/LogoBanner';
import WeatherDisplayControl from './WeatherDisplayControl/WeatherDisplayControl';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">              
        <LogoBanner />
        <WeatherDisplayControl />        
      </div>
    );
  }
}

export default App;
