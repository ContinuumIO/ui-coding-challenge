import React from 'react';

export default class Buttons extends React.Component {
  render () {
    console.log('BUTTONS PROPS');
    console.log(store);
    console.log(this.props);
    return (
      <div> Buttons </div>
    );
  }
}
