import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('displays the correct error message', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h1').text()).toBe("I'm getting lost 😅");
  });

  it('applies the correct classes', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h1').prop('className')).toContain('error');
  });
});
