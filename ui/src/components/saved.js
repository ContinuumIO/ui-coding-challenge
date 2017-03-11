// if I get to it make this a react drop down menu
import React from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const FontAwesome = require('react-fontawesome');

import { toggleList,
          loadGame
        } from '../redux/actions';

export default class GameList extends React.Component {
  constructor() {
    super();
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    store.dispatch(toggleList());
  }

  loadGame(id) {
    store.dispatch(loadGame(id));
  }

  render() {
    return (
      <Dropdown
        ref={(dropdown) => {
          this.dropdown = dropdown;
        }}
        onHide={this.toggleList}
        onShow={this.toggleList}
      >
        <DropdownTrigger>
          { (this.props.listOpen)
            ? <div className='btn btn-game btn-game-open'>
              <div> Previous Games </div>
              <FontAwesome
                className='button-icon'
                name='chevron-up'
              />
            </div>
            : <div className='btn btn-game'>
              <div> Previous Games </div>
              <FontAwesome
                className='button-icon'
                name='chevron-down'
              />
            </div>
          }
        </DropdownTrigger>
        <DropdownContent>
          <ul>
          {
            (this.props.waiting)
            ? <li className='loading hidden'>
              Loading Games
              <div className='loading-icon'/>
            </li> : null
          }
          {
            (this.props.games.length > 0)
                ? this.props.games.map((val, index) => {
                  return <li
                    className='loadable-game'
                    onClick={this.loadGame.bind(this, val.id)}
                    key={val.id}
                  >
                    {'Game ' + (index + 1)}
                  </li>;
                })
                : <li
                  className='no-games'
                >
                  No Games Available
                </li>
          }
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
}
