import React, { Component } from 'react';
import "./SearchBar.css";

class SearchBar extends React.Component {	

	constructor(props){
		super(props);
		const savedLocation = localStorage.getItem('location');
		this.state = {value: savedLocation ? savedLocation : ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		this.props.handleSubmit(this.state.value);
		e.preventDefault();
	}

	handleChange(e){
		this.setState({
			value: e.target.value
		})
		/*
			Insert Code for Auto Completion
		*/
	}

	render() {	
		return(
			<div className="SearchBar">
				<form className="SearchForm" onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} placeholder="City, State or Zip Code" className="SearchBox" onChange={this.handleChange} />
					<button type="submit" className="SearchButton">Search</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;