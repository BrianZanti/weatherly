import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Welcome from '../Welcome/Welcome';
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
      forecastData: {},
      observationData: {},      
    }    
    this.handleLocationUpdate= this.handleLocationUpdate.bind(this);
    this.apiForecastQuerySuccess = this.apiForecastQuerySuccess.bind(this);
    this.apiObservationQuerySuccess = this.apiObservationQuerySuccess.bind(this);
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
      let url = "http://api.wunderground.com/api/" + apiKey + "/geolookup/forecast/q";
      for(let i = params.length - 1; i >= 0; i--){
        url += '/' + params[i].trim();  
      }      
      url += '.json';
            
      $.ajax({
        url : url,
        dataType :    "jsonp",
        success : this.apiForecastQuerySuccess,
        error: this.apiQueryError
      });

      url = url.replace('forecast','conditions');

      $.ajax({
        url : url,
        dataType : "jsonp",
        success : this.apiObservationQuerySuccess,
        error: this.apiQueryError
      });    
  }

  apiForecastQuerySuccess(parsed_json){        
    console.log(parsed_json); 
    
    if(parsed_json.forecast){            
      let tempForecastData = {};

      let location = parsed_json.location;      
      let forecast = parsed_json.forecast;

      tempForecastData.city = location.city;
      tempForecastData.state = location.state;
      tempForecastData.zip = location.zip;      
      tempForecastData.high = forecast.simpleforecast.forecastday[0].high.fahrenheit;
      tempForecastData.low = forecast.simpleforecast.forecastday[0].low.fahrenheit;
      tempForecastData.summary = forecast.txt_forecast.forecastday[0].fcttext;
      tempForecastData.icon_url = forecast.txt_forecast.forecastday[0].icon_url;

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
      tempForecastData.date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + postfix;
      


      this.setState({
        forecastData: tempForecastData,
        message: ''
      })      
    }
    else if(parsed_json.response.error){
      //No suggestions or match
      this.setState({
        message: cityNotFoundMessage,
        forecastData: {}
      })
    }    
    else if(parsed_json.response.results){ 
      //Suggestions found but no match
      this.setState({
        message: cityNotFoundMessage,
        forecastData: {}
      })
    }
    else{
      alert("unknown error");
    }      
  }

  apiObservationQuerySuccess(parsed_json){        
      console.log(parsed_json);

    if(parsed_json.current_observation){                  
      let tempObservationData = {};

      let current_observation = parsed_json.current_observation;      

      tempObservationData.currentTemp = current_observation.temp_f;
      tempObservationData.weather = current_observation.weather;      

      this.setState({
        observationData: tempObservationData,
        message: ''
      })      
    }
    else if(parsed_json.response.error){
      this.setState({
        message: cityNotFoundMessage,
        observationData: {}
      })
    }    
    else if(parsed_json.response.results){ 
      this.setState({
        message: cityNotFoundMessage,
        observationData: {}
      })
    }
    else{
      console.log("unknown error");
    }
  }

  apiQueryError(parrsed_json){
    console.log("api query error");
  }

  render() {        
    let content = "";

    if(this.state.message){
      content = <h2 className="Message">{this.state.message}</h2>
    }
    else if(this.state.observationData.weather){
      content = <CurrentWeather observationData={this.state.observationData} forecastData={this.state.forecastData}/>
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