import React, { Component } from 'react';
import "./Welcome.css";

class Welcome extends React.Component {	

	render() {
		return(
			<div className="Welcome">
				<h1>Welcome to Weatherly! Enter your City or Zip Code to get started</h1>				
			</div>
		);
	}
}

export default Welcome;