import React, { Component } from 'react';
import logo from '../resources/weatherly-logo.png';
import "./LogoBanner.css";

class LogoBanner extends React.Component {
	
	render() {
		return(
			<div className="LogoBanner">
				<img className="logo" src={logo} alt="logo"/>
			</div>
		);
	}
}

export default LogoBanner;