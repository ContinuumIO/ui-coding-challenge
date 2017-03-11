import React from 'react';
import ToeElement from './toe-element';

export default class ToeBoard extends React.Component {
  constructor() {
    super();
    this.winningLogic = this.winningLogic.bind(this);
  }

  winningLogic(val, index, props) {
    let returnedEl;
    if(props.winningIndices) {
      returnedEl = (props.winningIndices.some(arrVal => index === arrVal)) ?
        //return board elements that are part of winining indices
        <ToeElement
          currentPlayer={props.currentPlayer}
          occupied={val}
          key={index}
          winning={true}
          index={index}
        /> :
        // return occupied board elements that arent winning
        <ToeElement
          currentPlayer={props.currentPlayer}
          occupied={val}
          key={index}
          index={index}
        />
    } else {
      // return board element during game in progress
      returnedEl = <ToeElement
                currentPlayer={props.currentPlayer}
                occupied={val}
                key={index}
                index={index}
              />
    }
    return returnedEl;
  }

  render () {
    const row1 = this.props.board.slice(0,3);
    const row2 = this.props.board.slice(3,6);
    const row3 = this.props.board.slice(6,9);
    let boardClasses = ['board'];
    if (this.props.blankSlate || this.props.gameSetupInProgress) {
      boardClasses.push('hidden');
    }
    boardClasses= boardClasses.join(' ')
    return (
      <div className={boardClasses}>
        <div className='board-bg'>
          <div className='row'>
            {
              row1.map((val, index) => {
                return this.winningLogic(val, index, this.props)
              })
            }
          </div>
          <div className='row'>
            {
              row2.map((val, index) => {
                return this.winningLogic(val, index+3, this.props)
              })
            }
          </div>
          <div className='row'>
            {
              row3.map((val, index) => {
                return this.winningLogic(val, index+6, this.props)
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
