import React from 'react';
import ToeElement from './toe-element';

export default class ToeBoard extends React.Component {
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
            { row1.map((val, index) => { return <ToeElement occupied={val} key={index} /> } ) }
          </div>
          <div className='row'>
            { row2.map((val, index) => { return <ToeElement occupied={val} key={index+3}/> }) }
          </div>
          <div className='row'>
            { row3.map((val, index) => { return <ToeElement occupied={val} key={index+6} /> }) }
          </div>
        </div>
      </div>
    );
  }
}
