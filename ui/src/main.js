import './index.scss';

// import { alertHello } from './hello';

document.addEventListener('DOMContentLoaded', function(event) {

  let player1_field = document.getElementById('player1_field');
  let player2_field = document.getElementById('player2_field');
  let name_fields   = [player1_field, player2_field];
  
  let labels        = document.getElementsByTagName('label');

  let play_button   = document.getElementById('play_button');
  let undo_button   = document.getElementById('undo_button');
  let load_button   = document.getElementById('load_button');
  let save_button   = document.getElementById('save_button');

  let board         = document.getElementById('board');
  let squares       = board.getElementsByTagName('button')

  let started;
  let history;

  const symbols = 'XO'.split('');

  let set_all_squares_disabled = function(state) {
    for (let square of squares) {
      square.disabled = state;
    }
  }
  
  function check_for_win() {
    console.log('check for win');
  }

  function update_current_player_marker() {
    for (let label of labels) {
      label.classList.remove('current_player');
    }
    labels[ history.length%2 ].classList.add('current_player');
  }

  function undo() {
    if (history.length) {
      console.log('undo');
      let last_square = squares[ history.pop()-1 ];
      last_square.disabled = false;
      last_square.innerHTML = '';
      if (!history.length) { undo_button.disabled = true; }
      update_current_player_marker();
      console.log(history);
    }
  }
  
  let take_square = function(event) {
    let target = event.target;
    target.disabled = true;
    target.innerHTML = symbols[ history.length%2 ];
    history.push( target.dataset.square );
    if (history.length) { undo_button.disabled = false; }
    console.log(history);

    check_for_win();
    update_current_player_marker();
  }

  let play = function(event) {
    player1_field.disabled = true;
    player2_field.disabled = true;
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
    set_all_squares_disabled(true);
    player1_field.focus();
  }


  undo_button.addEventListener('click', undo);
  play_button.addEventListener('click', play);
  for (let field of name_fields) {
    field.addEventListener('keyup', check_names);
  }

  init();

});
