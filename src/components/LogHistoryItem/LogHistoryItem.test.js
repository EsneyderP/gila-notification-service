import React from 'react';
import { useSelector } from 'react-redux';
import { shallow } from 'enzyme';
import { TableCell, Tooltip } from '@material-ui/core';
import LogHistoryItem from './LogHistoryItem';

// Mock useSelector from react-redux
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

// Mock moment with a specific date (for testing purposes)
const mockCurrentDate = 'Jul 04, 1990 12:34PM';
jest.mock('moment', () => () => ({
  format: () => mockCurrentDate, // Mock the format function to return the mockCurrentDate
}));

describe('LogHistoryItem', () => {
  const mockLog = {
    _id: 'abd',
    message: 'Test log message',
    categoryId: 'category_id_1',
    channelProcessor: 'email',
    status: 'sent',
    updatedAt: '2023-07-04T12:34:56Z',
    user: {
      name: 'John Doe',
    },
  };

  const categories = [{
    _id: 'category_id_1',
    name: 'fancy',
  }];

  beforeEach(() => {
    // Clear the mock implementation before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    useSelector.mockReturnValue(categories);
    const wrapper = shallow(<LogHistoryItem log={mockLog} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('displays user name correctly', () => {
    useSelector.mockReturnValue(categories);
    const wrapper = shallow(<LogHistoryItem log={mockLog} />);
    expect(wrapper.find(TableCell).at(0).text()).toBe('John Doe');
  });

  it('displays truncated message correctly in Tooltip', () => {
    useSelector.mockReturnValue(categories);
    const wrapper = shallow(<LogHistoryItem log={mockLog} />);
    expect(wrapper.find(Tooltip).prop('title')).toBe('Test log message');
  });

  it('displays formatted date correctly', () => {
    useSelector.mockReturnValue(categories);
    const wrapper = shallow(<LogHistoryItem log={mockLog} />);
    expect(wrapper.find(TableCell).at(5).text()).toBe('Jul 04, 1990 12:34PM');
  });

});
