import React from 'react';

export default class ScoreBoard extends React.Component {
  render () {
    console.log("SCOREBOARD PROPS");
    console.log(this.props);
    return (
      <div> ScoreBoard </div>
    );
  }
}
