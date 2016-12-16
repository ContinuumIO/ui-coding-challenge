import './index.scss';

// import { alertHello } from './hello';

document.addEventListener('DOMContentLoaded', function(event) {

  let player0_field = document.getElementById('player0_field');
  let player1_field = document.getElementById('player1_field');
  let play_button   = document.getElementById('play_button');
  let undo_button   = document.getElementById('undo_button');
  let load_button   = document.getElementById('load_button');
  let save_button   = document.getElementById('save_button');
  let messages      = document.getElementById('messages');
  let board         = document.getElementById('board');
  let labels        = document.getElementsByTagName('label');
  let squares       = board   .getElementsByTagName('button');
  let name_fields   = [player0_field, player1_field];

  const symbols = 'XO'.split('');
  const api_url = '/api/games';
  let history;
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

  function current_player() { return history.length%2; }

  function update_current_player_marker() {
    for (let el of labels) { el.classList.remove('current_player'); }
    if (!game_over) {
      labels[ current_player() ].classList.add('current_player');
    }
  }

  function update_button_status() {
    let new_state = history.length ? false : true;
    undo_button.disabled = new_state; 
    save_button.disabled = new_state;
  }

  function show_message(heading, body) {
    messages.getElementsByTagName('h2')[0].innerHTML = heading;
    messages.getElementsByTagName('p' )[0].innerHTML = body;
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
    labels[winner.dataset.player].className='winner';
    show_message('Win!', name_fields[winner.dataset.player].value);
  }

  let take_square = function(event) {
    let target = event.target;
    if (!target.disabled) {
      target.disabled = true;
      target.innerHTML = symbols[ current_player() ];
      target.dataset.player = current_player();
      history.push( target.dataset.square );
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
    else if (history.length==9) {
      show_message('Game Over', 'Nobody wins');
    }
    update_current_player_marker();
  }





  function undo() {
    if (history.length) {
      let last_square = squares[history.pop()-1];
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
  
  let play = function(event) {
    history = [];
    game_over = false;
    for (let square of squares) { 
      square.classList.remove('winner');
      square.innerHTML = '';
      square.dataset.player = '';
      square.disabled = false;
    }
    clear_win_indicators();
    update_current_player_marker();
    undo_button.disabled = true;
    save_button.disabled = true;
  }



  function load(event) {
    let response = simple_REST("GET", api_url);
    console.log(response);
  }

  function save(event) {
    let game_data = {
      "players": [
        name_fields[0].value, 
        name_fields[1].value
      ],
      "board": get_current_board_data()
    }
    let response = simple_REST("POST", api_url, JSON.stringify(game_data));
    console.log(response);
  }


  

  board      .addEventListener('click', take_square);
  undo_button.addEventListener('click', undo);
  play_button.addEventListener('click', play);
  save_button.addEventListener('click', save);
  load_button.addEventListener('click', load);

  player0_field.focus();
  play();

});
