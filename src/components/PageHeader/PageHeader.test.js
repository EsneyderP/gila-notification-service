import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './PageHeader';
import { Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

describe('PageHeader', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    const wrapper = shallow(<PageHeader title={title} />);
    const typography = wrapper.find(Typography);
    expect(typography).toHaveLength(1);
    expect(typography.text()).toBe(title);
  });

  it('renders the default LeftIcon correctly', () => {
    const wrapper = shallow(<PageHeader title="Test Title" />);
    const menuIcon = wrapper.find(MenuIcon);
    expect(menuIcon).toHaveLength(1);
  });

  it('renders a custom LeftIcon correctly', () => {
    const CustomIcon = () => <div>Custom Icon</div>;
    const wrapper = shallow(<PageHeader title="Test Title" leftIcon={CustomIcon} />);
    const customIcon = wrapper.find(CustomIcon);
    expect(customIcon).toHaveLength(1);
  });

  it('calls onClickIcon when left icon is clicked', () => {
    const onClickIconMock = jest.fn();
    const wrapper = shallow(<PageHeader title="Test Title" onClickIcon={onClickIconMock} />);
    const menuIcon = wrapper.find(IconButton);
    menuIcon.simulate('click');
    expect(onClickIconMock).toHaveBeenCalledTimes(1);
  });
});
