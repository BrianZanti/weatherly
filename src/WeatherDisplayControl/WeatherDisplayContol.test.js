import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import WeatherDisplayControl from './WeatherDisplayControl';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe("WeatherDisplayControl test suite", () => {
	
	var div;	
	
	beforeEach(() => {				
		div = mount(<WeatherDisplayControl />);  					
	});

	it('renders the SearchBar', () => {				
  		expect(div.find('.SearchBar')).to.have.length(1);  		
	});

	it('displays the welcome message as the default', () => {
		expect(div.find('.Welcome')).to.have.length(1);
	});

	it('displays CurrentWeather when the location is updated', () => {
		//WeatherDisplayControl.prototype.handleSubmit
		div.instance().handleLocationUpdate("location");
		div.update();
		expect(div.instance().state.location).to.equal("location");
		expect(div.find('.Welcome')).to.have.length(0);
		expect(div.find('.CurrentWeather')).to.have.length(1);
	});
});




