import React, { Component } from 'react';
import "./CurrentWeather.css";

class CurrentWeather extends React.Component {	

	render() {
		return(
			<div className="CurrentWeather">
				<h1 className="CityName">SomeCity</h1>
				<p className="StateAndZip">Some State, 12345</p>
				<h2 className="Date">Sunday, October 1st</h2>
				<h3 className="TemperatureHeader">Current Temperature: 70*</h3>
				<div className="CurrentTemperature">
						70/32
						<img src="" alt="Weather Icon" className="CurrentWeatherIcon"/>
				</div>
				<p className="Summary">Partly generic with a chance of placeholders in the evening</p>

			</div>
		);
	}
}

export default CurrentWeather;