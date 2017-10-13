import React, { Component } from 'react';
import "./CurrentWeather.css";

class CurrentWeather extends React.Component {	
	
	render() {
		return(
			<div className="CurrentWeather">
				<h1 className="CityName">{this.props.weatherData.city}</h1>
				<p className="StateAndZip">{this.props.weatherData.state}, {this.props.weatherData.zip}</p>
				<h2 className="Date">{this.props.weatherData.date}</h2>
				<h3 className="TemperatureHeader">Current Temperature: {this.props.weatherData.currentTemp}&deg;</h3>
				<div className="Forecast">
						<p className="HighLow">{this.props.weatherData.high}&deg;/{this.props.weatherData.low}&deg;</p>
						<img src={this.props.weatherData.icon_url} alt="Weather Icon" className="CurrentWeatherIcon"/>
						
				</div>
				<p className="Summary">{this.props.weatherData.summary}</p>
			</div>
		);
	}
}

export default CurrentWeather;