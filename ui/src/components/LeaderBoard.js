import React, { PropTypes } from 'react';
import { getWinner } from '../helpers/game';
import '../styles/LeaderBoard.scss';

const LeaderBoard = ({ games = [] }) => {
  const leaderMap = games
    .map(game => {
      const { players, board } = game.attributes;
      return players[getWinner(board)];
    })
    .filter(winner => winner)
    .reduce((board, winner) => {
      const nextMap = {
        ...board,
        [winner]: board[winner] ? board[winner] += 1 : 1
      };

      return nextMap;
    }, {});

  const leadersArray = Object.keys(leaderMap)
    .filter(key => leaderMap.hasOwnProperty(key))
    .map(key => {
      return {
        name: key,
        wins: leaderMap[key]
      };
    })
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 10);

  return (
    <div className="leader-board">
      <h1>Leaderboard</h1>
      <div className="leaders">
        {
          leadersArray.map((leader, i) => {
            return (
              <div key={leader.name} className="leader">
                <div>{leader.name}</div>
                <div>{leader.wins}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

LeaderBoard.propTypes = {
  games: PropTypes.array
};

export default LeaderBoard;
