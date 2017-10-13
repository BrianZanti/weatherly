import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Welcome from '../Welcome/Welcome';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import apiKey from '../wunderground-api-key';
import $ from 'jquery';


class WeatherDisplayControl extends Component {
  constructor(props){
    super(props);
    const savedLocation = localStorage.getItem('location');    
    this.state = {
      location: savedLocation ? savedLocation : '',      
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
    if(params.length <= 2){
      let url = "http://api.wunderground.com/api/" + apiKey + "/geolookup/forecast/q/";
      if(params.length == 2){
        url = url + params[1].trim() + '/';
      }
      url = url + params[0].trim() +'.json';
      
      console.log(url);
      $.ajax({
        url : url,
        dataType : "jsonp",
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
      tempForecastData.dateStr = date.getDay() + ", " + date.getMonth() + date.getDate();

      this.setState({
        forecastData: tempForecastData
      })      
    }
    else if(parsed_json.response.error){
      //No suggestions or match
    }    
    else if(parsed_json.response.results){ 
      //Suggestions found but no match
    }
    else{
      alert("unknown error");
    }      
  }

  apiObservationQuerySuccess(parsed_json){        
    if(parsed_json.current_observation){                  
      let tempObservationData = {};

      let current_observation = parsed_json.current_observation;      

      tempObservationData.currentTemp = current_observation.temp_f;
      tempObservationData.weather = current_observation.weather;      

      this.setState({
        observationData: tempObservationData
      })      
    }
    else if(parsed_json.response.error){
      //alert(parsed_json.response.error.description);
    }    
    else if(parsed_json.response.results){ 
      //Suggestions found but no match
    }
    else{
      alert("unknown error");
    }
  }



  apiQueryError(parsed_json){
    alert("api query error");
  }

  render() {        
    let content = "";
    if(this.state.observationData.weather){
      content = <CurrentWeather observationData={this.state.observationData} forecastData={this.state.forecastData}/>
    }
    else if(!this.state.location){    
      content = <Welcome />
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