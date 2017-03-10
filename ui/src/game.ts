export class TicTacToeGame {
  state: any
  boardElement: HTMLElement
  leaderBoardElement: HTMLElement
  titleElement: HTMLElement
  
  constructor(state: Object = null) {
    this.state = state || 
      {
        players: ['Player 1', 'Player 2'], 
        boardData: ['','','','','','','','',''],
        turn: 'X',
        winner: null,
        movesLeft: 9,
        leaderBoard: null,
        winLine: []
      }

    
    this.state.players[0] = window.prompt('Player 1 (X) ENTER YOUR NAME:') || 'Player 1'
    this.state.players[1] = window.prompt('Player 2 (O) ENTER YOUR NAME:') || 'Player 2'

    this.boardElement = (() => {
      let board = document.createElement('div');
      board.className = 'game-board'
      board.addEventListener("click", (e: any) => {
        this.onBoardClick(e.target.id.split('-')[1])
      })
      return board
    })()

    this.leaderBoardElement = (() => {
      let leaderBoard = document.createElement('div');
      leaderBoard.className = 'game-score-board'
      return leaderBoard
    })()

    this.titleElement = (() => {
      let titleElement = document.createElement('div');
      titleElement.className = 'game-title-element'
      titleElement.innerHTML = `<h2>${this.state.players[0]} (X) VS ${this.state.players[1]} (O)</h2>`
      return titleElement
    })()

    this.renderBoardState()
    this.createLeaderBoardMessage()
  }
  
  onBoardClick(id: number) {
    if (this.state.boardData[id] === '' && this.state.winner === null) {

      this.state.boardData[id] = this.state.turn === 'X' ? 'X' : 'O'
      this.state.turn = this.state.turn === 'X' ? 'O' : 'X'
      this.state.winner = this.checkWin();
      this.state.movesLeft--
      this.state;      
      this.renderBoardState();
      this.createLeaderBoardMessage()
    
    } else if (this.state.winner === null || this.state.movesLeft === 0) {
      //THE GAME ENDED IN A DRAW!
      console.log('GAME OVER')
    } else {
      console.log('ALREADY PLAYED THERE!')
    }
 
  }

  createLeaderBoardMessage() {
    if (this.state.winner === null && this.state.movesLeft === 0) {
      //THE GAME ENDED IN A DRAW!
      this.state.turn = 'DRAW'
      this.state.leaderBoard = 'DRAW'
    } else if (this.state.winner !== null) {
      //SOMEBODY WON THE GAME!
      this.state.turn = this.state.winner
      this.state.leaderBoard = (this.state.winner === 'X' ? 
      this.state.players[0] : this.state.players[1]) + `(${this.state.winner}) WINS!`
    } else {
      this.state.leaderBoard = (this.state.turn === 'X' ? 
      this.state.players[0] : this.state.players[1])  + `(${this.state.turn}) PLAY NOW!`
    }
    this.renderLeaderElement();
  }

  renderLeaderElement() {
    this.leaderBoardElement.innerHTML = 
      `<h1 class='player-${this.state.turn}'> ${this.state.leaderBoard} </h1>`
  }

  renderBoardState() {  
    this.boardElement.innerHTML = this.state.boardData.reduce((a: string, x: string, i: number) => {
      a += `<div class="board-element player-${x} ${this.state.winLine.indexOf(i) != -1 && 'win-element'}" id="board-${i}">${x}</div>`
      return a
    }, '')
  }

  checkWin() {
    let boardData = this.state.boardData
    const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    
    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (boardData[x] && boardData[x] === boardData[y] && boardData[x] === boardData[z]) {
        this.state.winLine = lines[i]
        return boardData[x];
      }
    }
    return this.state.movesLeft ? null : 'DRAW';
  }
}