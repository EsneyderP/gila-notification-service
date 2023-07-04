import React from 'react';
import { shallow } from 'enzyme';
import {
    MenuItem,
    TextField,
  } from '@material-ui/core';
import ListSelector from './ListSelector';

const mockItems = [
  { _id: '1', name: 'Item 1' },
  { _id: '2', name: 'Item 2' },
  { _id: '3', name: 'Item 3' },
];

describe('ListSelector', () => {
  it('renders the correct number of options', () => {
    const wrapper = shallow(<ListSelector items={mockItems} onChange={() => {}} />);
    const optionElements = wrapper.find(MenuItem);
    expect(optionElements).toHaveLength(mockItems.length);
  });

  it('calls onChange with the selected item', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<ListSelector items={mockItems} onChange={mockOnChange} />);
    const selectElement = wrapper.find(TextField).at(0);

    // Simulate a change event and select the second item
    selectElement.simulate('change', { target: { value: '2' } });

    // The onChange prop should be called with the second item
    expect(mockOnChange).toHaveBeenCalledWith(mockItems[1]);
  });

  it('displays the correct label', () => {
    const mockLabel = 'Test Label';
    const wrapper = shallow(<ListSelector label={mockLabel} items={mockItems} onChange={() => {}} />);
    const labelElement = wrapper.find(TextField).props().label;

    expect(labelElement).toBe(mockLabel);
  });

  it('displays the correct disabled state', () => {
    const wrapper = shallow(<ListSelector disabled items={mockItems} onChange={() => {}} />);
    const isDisabled = wrapper.find(TextField).props().disabled;

    expect(isDisabled).toBe(true);
  });
});
