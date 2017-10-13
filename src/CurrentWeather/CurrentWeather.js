import React, { Component } from 'react';
import "./CurrentWeather.css";

class CurrentWeather extends React.Component {	

	constructor(props){
		super(props);
		this.state = {
			weatherData: {}
		}
	}

	render() {
		return(
			<div className="CurrentWeather">
				<h1 className="CityName">{this.props.forecastData.city}</h1>
				<p className="StateAndZip">{this.props.forecastData.state}, {this.props.forecastData.zip}</p>
				<h2 className="Date">{this.props.forecastData.date}</h2>
				<h3 className="TemperatureHeader">Current Temperature: {this.props.observationData.currentTemp}</h3>
				<div className="Forecast">
						<h3 className="HighLow">{this.props.forecastData.high}/{this.props.forecastData.low}<img src={this.props.forecastData.icon_url} alt="Weather Icon" className="CurrentWeatherIcon"/></h3>
						
				</div>
				<p className="Summary">{this.props.forecastData.summary}</p>
			</div>
		);
	}
}

export default CurrentWeather;