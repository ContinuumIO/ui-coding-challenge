import React from 'react';
import { mount } from 'enzyme';
import NewGame from '../components/NewGame';

describe('Button', () => {
  it('sets state with players passed to it', () => {
    const newGame = mount(
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

    const newGame = mount(
      <NewGame players={['Kermit', 'Gonzo']} onStartGame={onStartGame}/>
    );

    newGame.find('form').simulate('submit');
    expect(players[0]).toEqual('Kermit');
    expect(players[1]).toEqual('Gonzo');
  });
});
