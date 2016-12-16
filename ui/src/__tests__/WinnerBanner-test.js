import React from 'react';
import { shallow } from 'enzyme';
import WinnerBanner from '../components/WinnerBanner';

describe('WinnerBanner', () => {
  it('renders the correct message', () => {
    const winnerBanner = shallow(
      <WinnerBanner
        winner=''
        message='I am the message'
        onPlayAgain={() => {}}
      />
    );
    expect(winnerBanner.contains('I am the message')).toEqual(true);
  });

  it('renders the correct winner', () => {
    const winnerBanner = shallow(
      <WinnerBanner
        winner='Chris'
        message=''
        onPlayAgain={() => {}}
      />
    );
    expect(winnerBanner.contains('Chris')).toEqual(true);
  });
});
