import React from 'react';
const FontAwesome = require('react-fontawesome');
import { makeMove } from '../../redux/actions';

export default class ToeElement extends React.Component {
  constructor() {
    super();
    this.toggleHoverEmpty = this.toggleHoverEmpty.bind(this);
    this.toggleHoverOccupied = this.toggleHoverOccupied.bind(this);
    this.makeMove = this.makeMove.bind(this);
  }

  toggleHoverEmpty() {
    return;
  }

  toggleHoverOccupied() {
    return;
  }

  makeMove(currentPlayer, index) {
    store.dispatch(makeMove(currentPlayer, index));
  }

  render() {
    let element;
    const x = <div className='player-side'>
      <FontAwesome
        className='side-logo'
        name='times'
        size='3x'
      />
    </div>
    const o = <div className='player-side'>
      <FontAwesome
        className='side-logo'
        name='circle-o'
        size='3x'
      />
    </div>
    const set = { 0: x, 1: o };
    if(this.props.occupied) {
      return (
          <div
            className='toe-element'
            onMouseEnter={this.toggleHoverOccupied}
            onMouseLeave={this.toggleHoverOccupied}
            winning={this.props.winningIndices.some(val => val === this.props.occupied)}
          >
            { set[this.props.occupied] }
          </div>
        );
    } else {
      return (
        <div
          className='toe-element'
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
          onClick={this.makeMove.bind(this, this.props.currentPlayer, this.props.key)}>
        </div>
      );
    }
  }
}
