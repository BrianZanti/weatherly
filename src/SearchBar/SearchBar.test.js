import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import SearchBar from './SearchBar';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe("SearchBar Test Suite", () => {
	
	var div;
	var mockHandleSubmit;

	beforeEach(() => {		
		mockHandleSubmit = sinon.spy();
		div = mount(<SearchBar handleSubmit={mockHandleSubmit} />);  					
	});

	it('renders the SearchBar', () => {				
  		expect(div.find('.SearchBar')).to.have.length(1);  		
	});

	it('has a text input', () => {
		expect(div.find('input')).to.have.length(1);
	});

	it('has a submit button', () => {
		expect(div.find('button[type="submit"]')).to.have.length(1);		
	});	

	it('Calls handleSubmit with textbox input when form is submitted', () => {
		const event = {target: {name: "textbox", value: "a"}};
		div.find('input').simulate('change', event);				
		div.find('form').simulate('submit');
		expect(mockHandleSubmit.calledWith("a")).to.equal(true);
		expect(mockHandleSubmit.calledOnce).to.equal(true);
	});


});




