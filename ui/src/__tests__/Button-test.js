import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/Button';

describe('Button', () => {
  it('has no type by default', () => {
    const button = shallow(
      <Button />
    );

    expect(button.props().type).toEqual(undefined);
  });

  it('sets the correct type', () => {
    const button = shallow(
      <Button
        type='submit'
      />
    );
    expect(button.props().type).toEqual('submit');
  });

  it('is not disabled by default', () => {
    const button = shallow(
      <Button />
    );
    expect(button.props().disabled).toEqual(undefined);
  });

  it('will can be set as disabled', () => {
    const button = shallow(
      <Button
        disabled={true}
      />
    );
    expect(button.props().disabled).toEqual(true);
  });

  it('has no backgroundColor by default', () => {
    const button = shallow(
      <Button />
    );
    expect(button.props().style.backgroundColor).toEqual('');
  });

  it('can set its backgroundColor', () => {
    const button = shallow(
      <Button
        backgroundColor='black'
      />
    );

    expect(button.props().style.backgroundColor).toEqual('black');
  });

  it('calls the onClick callback', () => {
    let clicked;
    const onClick = () => {
      clicked = true;
    };
    const button = shallow(
      <Button
        onClick={onClick}
      />
    );
    button.find('button').simulate('click');
    expect(clicked).toEqual(true);
  });

  it('renders its children', () => {
    const button = shallow(
      <Button>
        Child
      </Button>
    );
    expect(button.contains('Child')).toEqual(true);
  });
});
