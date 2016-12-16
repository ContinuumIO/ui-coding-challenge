import './index.scss';

// import { alertHello } from './hello';

document.addEventListener('DOMContentLoaded', function(event) {

  let player0_field = document.getElementById('player0_field');
  let player1_field = document.getElementById('player1_field');
  let name_fields   = [player0_field, player1_field];
  
  let labels        = document.getElementsByTagName('label');

  let play_button   = document.getElementById('play_button');
  let undo_button   = document.getElementById('undo_button');
  let load_button   = document.getElementById('load_button');
  let save_button   = document.getElementById('save_button');

  let messages      = document.getElementById('messages');
  let board         = document.getElementById('board');
  let squares       = board.getElementsByTagName('button')

  let started;
  let history;

  const symbols = 'XO'.split('');
  let game_over;


  let set_all_squares_disabled = function(state) {
    for (let square of squares) { 
      square.disabled       = state; 
      square.dataset.player = ''; 
    }
  }
  
  function check_for_win() {

    let current_board = [];
    for (let i=0; i<squares.length; i++) {
      let player = squares[i].dataset.player;
      current_board[i] = player=='' ? null : player;
    }
    console.log('checking for win, current_board is', current_board);

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
    
    if (history.length==9) {
      show_message('Game Over', 'Nobody wins');
      save_button.disabled = false;
    }
  }

  function show_message(heading, body) {
    messages.getElementsByTagName('h2')[0].innerHTML = heading;
    messages.getElementsByTagName('p' )[0].innerHTML = body;
  }

  function show_winner() {
    const winner = squares[ game_over[0] ];

    for (let position of game_over) {
      squares[position].classList.add('winner');
    }

    for (let square of squares) { square.disabled = true; }

    console.log(labels);
    for (let label of labels) { label.classList.remove('current_player'); }

    labels[ winner.dataset.player ].classList.add('winner');

    save_button.disabled = false;

    show_message('Win!', name_fields[winner.dataset.player].value);
  }

  function update_current_player_marker() {
    for (let label of labels) { label.classList.remove('current_player'); }
    labels[ history.length%2 ].classList.add('current_player');
  }

  function undo() {
    if (history.length) {
      // console.log('undo');
      let last_square = squares[ history.pop()-1 ]; // history values are 1-indexed
      last_square.disabled = false;
      last_square.innerHTML = '';
      last_square.dataset.player = '';
      if (!history.length) { undo_button.disabled = true; }

      for (let square of squares) { 
        square.classList.remove('winner'); 
      }
      show_message('', '');

      update_current_player_marker();
      // console.log(history);
    }
  }
  
  let take_square = function(event) {
    let target = event.target;
    if (!target.disabled) {
      target.disabled = true;
      target.innerHTML = symbols[ history.length%2 ];
      target.dataset.player = history.length%2;
      history.push( target.dataset.square );
      if (history.length) { undo_button.disabled = false; }
      // console.log(history);

      check_for_win();
      update_current_player_marker();
    }
  }

  let play = function(event) {
    for (let field of name_fields) { field.disabled = true; }
    player1_field.disabled = true;
    play_button.disabled = true;
    set_all_squares_disabled(false);
    board.addEventListener('click', take_square);
    update_current_player_marker();
    started = true;
  }

  let check_names =  function(event) {
    for (let field of name_fields) {
      if (field.value=='') {
        play_button.disabled = true;
        return;
      } 
    }
    play_button.disabled = false;
  }

  let init = function() {
    started = false;
    history = [];
    game_over = false;
    load_button.disabled = false;
    set_all_squares_disabled(true);
    player0_field.focus();

    let board_number = Math.floor( Math.random()*5 );
    board.dataset.boardNumber   = board_number;
    players.dataset.boardNumber = board_number;
  }

  function load(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/games", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response);
  }

  function save(event) {
    let game_data = {
      "players": ["Alice", "Bhopal"],
      "board": [null, null,    1,
                   0, null,    1,
                null, null, null]
    }
    let content = JSON.stringify(game_data);
    console.log(content);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/games", false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send( content );
    let response = JSON.parse(xhr.responseText);
    console.log(response);

  }

  undo_button.addEventListener('click', undo);
  play_button.addEventListener('click', play);
  save_button.addEventListener('click', save);
  load_button.addEventListener('click', load);

  for (let field of name_fields) {
    field.addEventListener('keyup', check_names);
  }

  init();

});
