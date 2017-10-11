import React, { Component } from 'react';
import "./SearchBar.css";

class SearchBar extends React.Component {	

	render() {
		return(
			<div className="SearchBar">
				<input type="text" placeholder="City or Zip Code" className="SearchBox"/>
				<button type="submit" className="SearchButton">Search</button>
			</div>
		);
	}
}

export default SearchBar;