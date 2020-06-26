import React from 'react';

import { shallow } from 'enzyme';

import { findByTestAtrr } from './../Utils';

import Header from './header';
import sinon from 'sinon';


it('renders header tab name', () => {
  const wrapper = shallow(<Header />);
  const welcome = 'SAP Ariba AMS Dashboard';
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});

 it("simulates click event for dropdown", function() {
    const rendered = shallow(<Header />);
    const instance=rendered.instance() ;
    const handleClick = sinon.spy(instance, 'handleClick');
   
    // this make the trick
    instance.forceUpdate()

    rendered.find('#navbarDropdown').simulate('click');

    sinon.assert.calledOnce(handleClick); 
    //expect(handleClick).toHaveBeenCalled();
  });