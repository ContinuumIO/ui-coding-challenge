import React from 'react';
import ToeElement from './toe-element';

export default class ToeBoard extends React.Component {
  render () {
    const row1 = this.props.board.slice(0,3);
    const row2 = this.props.board.slice(3,6);
    const row3 = this.props.board.slice(6,9);
    return (
      <div className='board-container'>
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
