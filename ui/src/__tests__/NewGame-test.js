import React from 'react';
import { shallow } from 'enzyme';
import NewGame from '../components/NewGame';

describe('Button', () => {
  it('sets state with players passed to it', () => {
    const newGame = shallow(
      <NewGame players={['Kermit', 'Gonzo']} onStartGame={() => {}}/>
    );

    expect(newGame.state('player1')).toEqual('Kermit');
    expect(newGame.state('player2')).toEqual('Gonzo');
  });

  it('passes the players when submitted', () => {
    let players;
    const onStartGame = (submittedPlayers) => {
      players = submittedPlayers;
    };

    const newGame = shallow(
      <NewGame players={['Kermit', 'Gonzo']} onStartGame={onStartGame}/>
    );

    newGame.find('form').simulate('submit', { preventDefault: () => {} });
    expect(players).toEqual(['Kermit', 'Gonzo']);
  });
});
