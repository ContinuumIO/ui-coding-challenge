import React from 'react';
import './Board.scss';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.boundUpBttnState = this.updateBttnState.bind(this);
  }

  componentDidMount() {
    this.addBttnListeners();
  }

  addBttnListeners() {
    const buttons = this.arrayify(document.querySelectorAll('.squareBttn'));
    buttons.forEach((button) => {
      button.addEventListener('click', this.boundUpBttnState, true);
    });
  }

  updateBttnState(event) {
    const button = event.target;
    event.target.textContent === 'O' ?
    event.target.textContent = 'X' :
    event.target.textContent = 'O';
    button.blur();
    button.removeEventListener('click', this.boundUpBttnState, true);
  }

  arrayify(nodeList) {
    return [].slice.call(nodeList);
  }

  render() {
    return (
      <section className='board'>
        <div className='row row-1'>
          <button href='#' id='0' className='squareBttn' />
          <button href='#' id='1' className='squareBttn' />
          <button href='#' id='2' className='squareBttn' />
        </div>
        <div className='row row-2'>
          <button href='#' id='3' className='squareBttn' />
          <button href='#' id='4' className='squareBttn' />
          <button href='#' id='5' className='squareBttn' />
        </div>
        <div className='row row-3'>
          <button href='#' id='6' className='squareBttn' />
          <button href='#' id='7' className='squareBttn' />
          <button href='#' id='8' className='squareBttn' />
        </div>
      </section>
    );
  }
}

export default Board;
