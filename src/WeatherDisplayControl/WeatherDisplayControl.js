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
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    
  }

  render() {    
    const content = this.state.searchText ? <CurrentWeather/> : <Welcome />;
    return (
      <div className = "WeatherDisplayControl">
        <SearchBar  handleSubmit={this.handleSubmit}/>
        {content}
      </div>
    );
  }
}

export default WeatherDisplayControl;