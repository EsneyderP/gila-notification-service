import React from 'react';
import { shallow } from 'enzyme';
import { Snackbar } from '@material-ui/core';
import Toast, { Alert } from './Toast';

describe('Toast', () => {
  it('renders the message correctly', () => {
    const message = 'Test Message';
    const wrapper = shallow(<Toast message={message} />);
    const alert = wrapper.find(Alert);
    expect(alert).toHaveLength(1);
    expect(alert.prop('children')).toBe(message);
  });

  it('renders the default severity correctly', () => {
    const wrapper = shallow(<Toast message="Test Message" />);
    const alert = wrapper.find(Alert);
    expect(alert.prop('severity')).toBe('success');
  });

  it('renders the specified severity correctly', () => {
    const severity = 'error';
    const wrapper = shallow(<Toast message="Test Message" severity={severity} />);
    const alert = wrapper.find(Alert);
    expect(alert.prop('severity')).toBe(severity);
  });

  it('calls onClose when Snackbar is closed', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(<Toast message="Test Message" open onClose={onCloseMock} />);
    wrapper.find(Snackbar).simulate('close');
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
