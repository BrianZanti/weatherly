import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import WeatherDisplayControl from './WeatherDisplayControl';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import $ from 'jquery';
import apiKey from '../wunderground-api-key';

Enzyme.configure({ adapter: new Adapter() });

describe("WeatherDisplayControl test suite", () => {
	
	var mountedWeatherDisplayControl;	

	beforeEach(() => {
		mountedWeatherDisplayControl = mount(<WeatherDisplayControl />);
	});

	it('renders the SearchBar', () => {
  		expect(mountedWeatherDisplayControl.find('.SearchBar')).to.have.length(1);
	});

	it('displays the welcome message as the default', () => {
		expect(mountedWeatherDisplayControl.find('.Message')).to.have.length(1);
		expect(mountedWeatherDisplayControl.find('.Message').text()).to.contain('Welcome to Weatherly!');
	});	

	it('displays CurrentWeather when the API call succeeds', () => {		

		var parsed_json = {
				current_observation : {
					temp_f : '70',
					weather : 'Clear'
				},
				location : {
					city : 'someCity',
					state : 'NA',
					zip : '12345',

				},
				forecast : {
					simpleforecast : {
						forecastday : [
							{
								high : '100',
								low : '0',								
							}
						]
					},
					txt_forecast : {
						forecastday : [
							{
								fcttxt : 'summary',
								icon_url : 'http://icons.wxug.com/i/c/k/clear.gif'
							}
						]
					}
				}		
			}	    	

		mountedWeatherDisplayControl.instance().apiQuerySuccess(parsed_json);
		mountedWeatherDisplayControl.update();		
		expect(mountedWeatherDisplayControl.find('.Message')).to.have.length(0);
		expect(mountedWeatherDisplayControl.find('.CurrentWeather')).to.have.length(1);
		expect(mountedWeatherDisplayControl.find('.CityName').text()).to.equal('someCity');
	});	

	it('displays correct message when API city is not found', () => {
		var parsed_json = {
			response : {
				error : {
					description: 'some error message'
				}
			}	
		}
		mountedWeatherDisplayControl.instance().apiQuerySuccess(parsed_json);
		mountedWeatherDisplayControl.update();		
		expect(mountedWeatherDisplayControl.find('.Message')).to.have.length(1);
		expect(mountedWeatherDisplayControl.find('.Message').text()).to.equal("We're sorry, we couldn't find the location you specified.");
	});
	
	it('displays correct message when API city is not found, but suggestions are', () => {
		var parsed_json = {
			response : {
				results : [
					{ suggestedCity : 'someCity' }
				]
			}	
		}
		mountedWeatherDisplayControl.instance().apiQuerySuccess(parsed_json);
		mountedWeatherDisplayControl.update();		
		expect(mountedWeatherDisplayControl.find('.Message')).to.have.length(1);
		expect(mountedWeatherDisplayControl.find('.Message').text()).to.equal("We're sorry, we couldn't find the location you specified.");
	});

	it('displays error message when API call is not successful', () => {		
		mountedWeatherDisplayControl.instance().apiQueryError();
		mountedWeatherDisplayControl.update();		
		expect(mountedWeatherDisplayControl.find('.Message')).to.have.length(1);
		expect(mountedWeatherDisplayControl.find('.Message').text()).to.equal("We're sorry, we experienced an unexpected error");
	});


});

describe("Testing with mock ajax calls", () => {	
	var mountedWeatherDisplayControl;	
	var ajaxSpy = sinon.spy($, 'ajax');;

	beforeEach(() => {
		mountedWeatherDisplayControl = mount(<WeatherDisplayControl />);	
		ajaxSpy.reset();
	}); 	 	  	

  	it("should make correct api call with city, state", () => { 		
  		mountedWeatherDisplayControl.instance().handleLocationUpdate("    denver,  co  ");
  		let url = "http://api.wunderground.com/api/" + apiKey + "/geolookup/forecast/conditions/q/co/denver.json";
  		expect(ajaxSpy.calledOnce).to.equal(true);  		
  		expect($.ajax.getCall(0).args[0].url).to.equal(url);  		
  	});

	it("should make correct api call with zip", () => { 		
  		mountedWeatherDisplayControl.instance().handleLocationUpdate("    11111  ");
  		let url = "http://api.wunderground.com/api/" + apiKey + "/geolookup/forecast/conditions/q/11111.json";
  		expect(ajaxSpy.calledOnce).to.equal(true);  		  		
  		expect($.ajax.getCall(0).args[0].url).to.equal(url);  		
  	});
});