import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Welcome from '../Welcome/Welcome';
import CurrentWeather from '../CurrentWeather/CurrentWeather';

class WeatherDisplayControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      weatherData: {}
    }
  }

  render() {
    console.log(this.state.searchText);
    const content = this.state.searchText ? <CurrentWeather/> : <Welcome />;
    return (
      <div className = "WeatherDisplayControl">
        <SearchBar />
        {content}
      </div>
    );
  }
}

export default WeatherDisplayControl;