import React from 'react';
import './Board.scss';

class Board extends React.Component {
  componentDidMount() {
    this.addBttnListeners();
  }

  addBttnListeners() {
    const buttons = this.arrayify(document.querySelectorAll('.squareBttn'));
    buttons.forEach((button) => {
      button.addEventListener('click', this.props.updateBttnState, true);
    });
  }

  arrayify(nodeList) {
    return [].slice.call(nodeList);
  }

  render() {
    return (
      <section className='board'>
        <div className='row row-1'>
          <button href='javascript:void(0)' id='0' className='squareBttn' />
          <button href='javascript:void(0)' id='1' className='squareBttn' />
          <button href='javascript:void(0)' id='2' className='squareBttn' />
        </div>
        <div className='row row-2'>
          <button href='javascript:void(0)' id='3' className='squareBttn' />
          <button href='javascript:void(0)' id='4' className='squareBttn' />
          <button href='javascript:void(0)' id='5' className='squareBttn' />
        </div>
        <div className='row row-3'>
          <button href='javascript:void(0)' id='6' className='squareBttn' />
          <button href='javascript:void(0)' id='7' className='squareBttn' />
          <button href='javascript:void(0)' id='8' className='squareBttn' />
        </div>
      </section>
    );
  }
}

export default Board;
