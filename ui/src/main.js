import './index.scss';

// import { alertHello } from './hello';

document.addEventListener('DOMContentLoaded', function(event) {

  let player0_field   = document.getElementById('player0_field');
  let player1_field   = document.getElementById('player1_field');
  let reset_button    = document.getElementById('reset_button');
  let undo_button     = document.getElementById('undo_button');
  let load_button     = document.getElementById('load_button');
  let save_button     = document.getElementById('save_button');
  let messages        = document.getElementById('messages');
  let game_list       = document.getElementById('game_list');
  let game_entry_list = game_list.getElementsByTagName('ul')[0];
  let dialog_screen   = document.getElementById('dialog_screen');
  let board           = document.getElementById('board');
  let labels          = document.getElementsByTagName('label');
  let squares         = board   .getElementsByTagName('button');
  let name_fields     = [player0_field, player1_field];

  const symbols = 'XO'.split('');
  const api_url = '/api/games';
  let log;
  let game_over;


  function simple_REST(method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
    return JSON.parse(xhr.responseText);
  }
  
  function get_current_board_data() {
    return [...squares].map(function(square){
      return square.dataset.player=='' ? null : square.dataset.player;
    });
  }

  function current_player() { return log.length%2; }

  function update_current_player_marker() {
    for (let el of labels) { el.classList.remove('current_player'); }
    if (!game_over) {
      labels[ current_player() ].classList.add('current_player');
    }
  }

  function update_button_status() {
    let new_state = log.length ? false : true;
    undo_button.disabled  = new_state; 
    save_button.disabled  = new_state;
    reset_button.disabled = new_state;
  }

  function hide_dialogs() {
    dialog_screen.classList.add('hidden');
    messages.classList.add('hidden');
    game_list.classList.add('hidden');
  }

  function show_message(heading, body) {
    if (!heading && !body) {
      messages.classList.add('hidden');
      dialog_screen.classList.add('hidden');
    } else {
      messages.classList.remove('hidden');
      dialog_screen.classList.remove('hidden');
    }
    messages.getElementsByTagName('h2')[0].innerHTML = heading ? heading : '';
    messages.getElementsByTagName('p' )[0].innerHTML = body ? body : '';
  }

  function clear_win_indicators() {
    for (let label of labels) { label.classList.remove('winner'); }
    for (let square of squares) { square.classList.remove('winner'); }
  }



  function show_winner() {
    const winner = squares[ game_over[0] ];
    for (let position of game_over) { squares[position].classList.add('winner'); }
    for (let square of squares) { square.disabled = true; }
    save_button.disabled = false;
    const playerNo = winner.dataset.player;
    labels[playerNo].className='winner';
    show_message(`${symbols[playerNo]} Wins!`, name_fields[playerNo].value);
  }

  let take_square = function(event) {
    let target = event.target;
    if (!target.disabled) {
      target.disabled = true;
      target.innerHTML = symbols[ current_player() ];
      target.dataset.player = current_player();
      log.push( target.dataset.square );
      update_button_status()
      check_for_win();
    }
  }



  function check_for_win() {
    let current_board = get_current_board_data();

    function check_set(set) {

      function check(positions) {
        if ( current_board[ positions[0] ] 
          && current_board[ positions[0] ] == current_board[ positions[1] ] 
          && current_board[ positions[0] ] == current_board[ positions[2] ] ) {
          return positions;
        } else {
          return false;
        }
      }

      for (let possible_win of set) { 
        let won = check(possible_win);
        if (won) {
          game_over = won;
          return true;
        }
      }
      return false;
    }

    let rows      = [ [0,1,2], [3,4,5], [6,7,8] ];
    let columns   = [ [0,3,6], [1,4,7], [2,5,8] ];
    let diagonals = [ [0,4,8], [2,4,6] ];

    check_set(rows);
    if (!game_over) { check_set(columns) }
    if (!game_over) { check_set(diagonals) }
    
    if (game_over) { show_winner(); } 
    else if (log.length==9) {
      show_message('Game Over', 'Nobody wins');
    }
    update_current_player_marker();
  }




  function undo() {
    if (log.length) {
      let last_square = squares[log.pop()-1];
      last_square.disabled = false;
      last_square.innerHTML = '';
      last_square.dataset.player = '';
      update_button_status()
      clear_win_indicators();
      show_message('', '');
      update_current_player_marker();
      for (let square of squares) {
        if (square.dataset.player=='') { square.disabled=false; }
      }
      game_over = null;
    }
  }
  
  function play(event) {
    log = [];
    game_over = false;
    for (let square of squares) { 
      square.classList.remove('winner');
      square.innerHTML = '';
      square.dataset.player = '';
      square.disabled = false;
    }
    clear_win_indicators();
    update_current_player_marker();
    board.dataset.gameId = '';
    undo_button.disabled = true;
    save_button.disabled = true;
  }

  function load_list(event) {
    const response = simple_REST("GET", api_url);
    console.log('load', response)  
    dialog_screen.classList.remove('hidden');
    game_list.classList.remove('hidden');
    game_entry_list.innerHTML = '';
    for (let game of response.data) {
      const entry = document.createElement("li");
      const player0 = game.attributes.players[0];
      const player1 = game.attributes.players[1];
      entry.innerHTML = `<a href="#" data-game-id="${game.id}">${player0} vs. ${player1}</a>`;
      game_entry_list.appendChild(entry);
    }
  }

  function load_game(event) {
    if (event.target.tagName=='A') {
      const response = simple_REST("GET", `${api_url}/${event.target.dataset.gameId}`);
      console.log('load_game', response);
      hide_dialogs();
      play();
      const game_data = response.data.attributes;
      name_fields[0].value = game_data.players[0];
      name_fields[1].value = game_data.players[1];
      log = game_data.log;
      board.dataset.gameId = response.data.id;
      for (var i=0; i<9; i++) {
        const value = game_data.board[i] ? parseInt(game_data.board[i]) : null;
        if (value != null) {
          squares[i].dataset.player = value;
          squares[i].disabled = true;
          squares[i].innerHTML = symbols[ value ];
        }
      }
      update_button_status();
      check_for_win();
    }
    return false;
  }

  function save(event) {
    const player0 = name_fields[0].value=='' ? 'Unknown' : name_fields[0].value;
    const player1 = name_fields[1].value=='' ? 'Unknown' : name_fields[1].value;
    const game_id = board.dataset.gameId;
    const game_data = {
      "players": [player0, player1],
      "board": get_current_board_data(),
      "log": log
    }
    const response = simple_REST("POST", `${api_url}/${game_id}`, JSON.stringify(game_data));
    board.dataset.gameId = response.id;
    load_button.disabled = false;
    console.log('save', response);
  }


  board      .addEventListener('click', take_square);
  undo_button.addEventListener('click', undo);
  reset_button.addEventListener('click', play);
  save_button.addEventListener('click', save);
  load_button.addEventListener('click', load_list);
  game_list  .addEventListener('click', load_game);
  messages .getElementsByTagName('button')[0].addEventListener('click', hide_dialogs);
  game_list.getElementsByTagName('button')[0].addEventListener('click', hide_dialogs);
  
  player0_field.focus();
  play();

});
