import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './WeatherDisplayControl.css';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import apiKey from '../wunderground-api-key';
import $ from 'jquery';

const welcomeMessage = 'Welcome to Weatherly! Get started by searching for your location.';
const cityNotFoundMessage = "We're sorry, we couldn't find the location you specified.";

class WeatherDisplayControl extends Component {
  constructor(props){
    super(props);
    const savedLocation = localStorage.getItem('location');    
    this.state = {
      location: savedLocation ? savedLocation : '',      
      message: savedLocation ? '' : welcomeMessage,
      weatherData: {},      
    }    
    this.handleLocationUpdate= this.handleLocationUpdate.bind(this);
    this.apiQuerySuccess = this.apiQuerySuccess.bind(this);    
    this.apiQueryError = this.apiQueryError.bind(this);    
    if(savedLocation){
      this.handleLocationUpdate(savedLocation);
    }
  }

  handleLocationUpdate(submittedText) {
    localStorage.setItem('location', submittedText);
    this.setState({
      location: submittedText
    })    

      let params = submittedText.split(',');                    
      let url = "http://api.wunderground.com/api/" + apiKey + "/geolookup/forecast/conditions/q";
      for(let i = params.length - 1; i >= 0; i--){
        url += '/' + params[i].trim();  
      }      
      url += '.json';
            
      $.ajax({
        url : url,
        dataType :    "jsonp",
        success : this.apiQuerySuccess,
        error: this.apiQueryError
      });      
  }

  apiQuerySuccess(parsed_json){     
    console.log(parsed_json);

    if(parsed_json.forecast){                  
      let current_observation = parsed_json.current_observation;            
      let location = parsed_json.location;      
      let simpleforecast = parsed_json.forecast.simpleforecast.forecastday[0];
      let txt_forecast = parsed_json.forecast.txt_forecast.forecastday[0];                  
      
      this.setState({        
        weatherData: {
          currentTemp : current_observation.temp_f,
          weather : current_observation.weather,   
          city : location.city,
          state : location.state,
          zip : location.zip,  
          high : simpleforecast.high.fahrenheit,
          low : simpleforecast.low.fahrenheit,
          summary : txt_forecast.fcttext,
          icon_url : txt_forecast.icon_url,
          date : this.getFormattedDate()
        },
        message: ''
      });
    }
    else if(parsed_json.response.error){
      //No suggestions or match
      this.setState({
        message: cityNotFoundMessage,
        weatherData: {}
      })
    }    
    else if(parsed_json.response.results){ 
      //Suggestions found but no match
      this.setState({
        message: cityNotFoundMessage,
        weatherData: {}
      })
    }
    else{
      alert("unknown error");
    }      
  }

  apiQueryError(parrsed_json){
    console.log("api query error");
  }

  getFormattedDate(){
    let date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let postfix = 'th';
    if(date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31){
      postfix = 'st';
    }
    if(date.getDate() === 2 || date.getDate() === 22){
      postfix = 'nd';
    }
    if(date.getDate() === 3 || date.getDate() ===23){
      postfix = 'rd';
    }
    return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + postfix;
  }

  render() {        
    let content = "";

    if(this.state.message){
      content = <h2 className="Message">{this.state.message}</h2>;
    }
    else if(this.state.weatherData.weather){
      content = <CurrentWeather weatherData={this.state.weatherData} />;
    }    
    
    return (
      <div className = "WeatherDisplayControl">
        <SearchBar  handleSubmit={this.handleLocationUpdate}/>
        {content}
      </div>
    );
  }
}

export default WeatherDisplayControl;