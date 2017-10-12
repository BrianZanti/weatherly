import React, { Component } from 'react';
import "./SearchBar.css";

class SearchBar extends React.Component {	

	constructor(props){
		super(props);
		this.state = {value: ""};
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
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="City or Zip Code" className="SearchBox" onChange={this.handleChange}/>
					<button type="submit" className="SearchButton">Search</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;