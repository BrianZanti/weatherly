import React, { Component } from 'react';
import LogoBanner from './LogoBanner/LogoBanner';
import SearchBar from './SearchBar/SearchBar';
import Welcome from './Welcome/Welcome';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">      
        <div className="LogoBanner">
          <LogoBanner />
        </div>        
        <div className="SearchBarDisplay">
          <SearchBar />
        </div>
        <div className="WeatherInfoDisplay">  
          <CurrentWeather />          
          <CurrentWeather />
        </div>        
      </div>
    );
  }
}

export default App;
