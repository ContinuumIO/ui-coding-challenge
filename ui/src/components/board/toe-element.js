import React from 'react';

export default class ToeElement extends React.Component {
  render() {
    return (
      <div className='toe-element'>
        { this.props.occupied !== null ? `${this.props.occupied}`: '' }
      </div>
    );
  }
}
