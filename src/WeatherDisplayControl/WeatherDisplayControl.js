import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Welcome from '../Welcome/Welcome';
import CurrentWeather from '../CurrentWeather/CurrentWeather';

class WeatherDisplayControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: "",
      weatherData: {}
    }
    this.handleLocationUpdate= this.handleLocationUpdate.bind(this);
  }

  handleLocationUpdate(submittedText) {
    this.setState({
      location: submittedText
    })    
  }

  render() {    
    const content = this.state.location ? <CurrentWeather/> : <Welcome />;
    return (
      <div className = "WeatherDisplayControl">
        <SearchBar  handleSubmit={this.handleLocationUpdate}/>
        {content}
      </div>
    );
  }
}

export default WeatherDisplayControl;