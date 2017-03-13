import './style.scss';

import {anyValueInArray, allValuesInArray, post} from "./utils";

document.addEventListener('DOMContentLoaded', function() {

var winningPlays = [['AA', 'AB', 'AC'],
                    ['BA', 'BB', 'BC'],
                    ['CA', 'CB', 'CC'],
                    ['AA', 'BA', 'CA'],
                    ['AB', 'BB', 'CB'],
                    ['AC', 'BC', 'CC'],
                    ['AA', 'BB', 'CC'],
                    ['AC', 'BB', 'CA']];

var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

var dim = 160;
var spacing = 20;
var dif = (canvas.height-dim*3)/2;
var r = dim/2-spacing
var centers = {A: dif+dim/2,
               B: dif+dim+dim/2,
               C: dif+dim*2+dim/2};

var welcomeBanner = document.getElementById("welcome-banner");
var setPlayersButton = document.getElementById("set-players-button")
var outcomeBannerText = document.getElementById("banner");
var outcomeBanner = document.getElementById("outcome-banner");
var saveButton = document.getElementById("save-button");
var resetButton = document.getElementById("reset-button");
var setUpButton = document.getElementById("set-up-button");

// DRAWING FUNCTIONS

function drawVline(n) {
  ctx.beginPath();
  ctx.moveTo(dim*n+dif, 0+dif);
  ctx.lineTo(dim*n+dif, dim*3+dif);
  ctx.stroke();
};

function drawHline(n) {
  ctx.beginPath();
  ctx.moveTo(0+dif, dim*n+dif);
  ctx.lineTo(dim*3+dif, dim*n+dif);
  ctx.stroke();
};

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawVline(1);
  drawVline(2);
  drawHline(1);
  drawHline(2);
};

function drawX(x, y) {
  ctx.beginPath();
  ctx.moveTo(x-r, y-r);
  ctx.lineTo(x+r, y+r);
  ctx.moveTo(x+r, y-r);
  ctx.lineTo(x-r, y+r);
  ctx.stroke();
};

function drawO(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false)
  ctx.stroke();
  ctx.closePath();
};

function getCenter(x) {
  var min = dim/2 + 1
  var box = null
    for (var prop in centers) {
      if (Math.abs(centers[prop]-x) < min) {
        var min = Math.abs(centers[prop]-x);
        var box = prop;
      }
    }
  return box;
};

 // GAME STATE FUNCTIONS

function alreadyPlayed(game, box_x, box_y) {
  return (game.played["X"].indexOf(box_y+box_x)>=0 || game.played["O"].indexOf(box_y+box_x)>=0);
};

function storePlay(game, box_x, box_y) {
  game.played[game.player].push(box_y+box_x);
  return game;
};

function outcome(game) {
  var contains = 0
  for (var i = 0; i < winningPlays.length; i++) {
    var array = winningPlays[i];
    if(allValuesInArray(array, game.played[game.player])) {
      win(game, array);
    }
    else {
      var bool = true
      for (var prop in game.played) {
        bool = bool && anyValueInArray(array, game.played[prop])
      }
      if(bool) {contains += 1;}
    }
  }
  if(contains == 8){
    draw();
  }
};

function win(game, array){
  outcomeBannerText.innerHTML = game.players[game.player] + ' wins!';
  outcomeBanner.className += ' win';
  saveButton.className += ' win';
  resetButton.className += ' win';
  setUpButton.className += ' win';
  ctx.beginPath();
  ctx.moveTo(centers[array[0][1]], centers[array[0][0]]);
  ctx.lineTo(centers[array[2][1]], centers[array[2][0]]);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#9ad12b";
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#000";
};

function draw() {
  outcomeBannerText.innerHTML = 'Game is a draw';
  outcomeBanner.className += ' draw';
  saveButton.className += ' draw';
  resetButton.className += ' draw';
  setUpButton.className += ' draw';
};

function saveGame() {
  var mapping = ['AA', 'AB', 'AC',
                 'BA', 'BB', 'BC',
                 'CA', 'CB', 'CC'];

  var board = [null, null, null,
               null, null, null,
               null, null, null];

  window.game.played["X"].forEach(function (item, value, array) {
    mapping.forEach(function (name, index, a) {
      if(item==name) {board[index] = 0}
    })
  });
  window.game.played["O"].forEach(function (item, value, array) {
    mapping.forEach(function (name, index, a) {
      if(item==name) {board[index] = 1}
    })
  });
  var attributes = {players: [game.players["X"], game.players["O"]], board: board};
  post('/api/games/', attributes);
};

// GAME PLAY

function play(x, y) {
  var game = window.game
  var box_x = getCenter(x);
  if(box_x != null) {
    var box_y = getCenter(y);
    if(box_y != null) {
      if(!alreadyPlayed(game, box_x, box_y)) {
        if(game.player=="X") {
          drawX(centers[box_x], centers[box_y]);
          var game = storePlay(game, box_x, box_y);
          outcomeBannerText.innerHTML = game.players["O"] + " plays next";
          outcome(game);
          game.player = "O";
        }
        else {
          drawO(centers[box_x], centers[box_y]);
          var game = storePlay(game, box_x, box_y);
          outcomeBannerText.innerHTML = game.players["X"] + " plays next";
          outcome(game);
          game.player = "X";
        }
      }
    }
  }
  return game;
};

// SET UP GAME

function setPlayerNames() {
  var playerX = (document.getElementById("playerX").value !== "") ? document.getElementById("playerX").value: "X";
  var playerO = (document.getElementById("playerO").value !== "") ? document.getElementById("playerO").value: "O";
  var players = {'X': playerX, 'O': playerO}
  window.game = {players: players, player: "X"};
  resetGame();
};

function resetGame() {
  window.game.played = {'X': [], 'O': []};
  welcomeBanner.className = 'banner inactive';
  outcomeBanner.className = 'banner active play';
  outcomeBannerText.innerHTML = game.players[game.player] + " plays first";
  saveButton.className = 'button play';
  resetButton.className = 'button play';
  setUpButton.className = 'button play';
  drawBoard();
};

function setUpGame() {
  document.getElementById("playerX").value = null;
  document.getElementById("playerO").value = null;
  welcomeBanner.className = 'banner active';
  outcomeBanner.className = 'banner inactive';
  saveButton.className = 'button disabled';
  resetButton.className = 'button disabled';
  setUpButton.className = 'button disabled';
  drawBoard();
};

setUpGame();

setPlayersButton.addEventListener("click", setPlayerNames, false)
saveButton.addEventListener("click", saveGame, false)
resetButton.addEventListener("click", resetGame, false)
setUpButton.addEventListener("click", setUpGame, false)

canvas.addEventListener("click", function(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  window.game = play(x, y);
  },
  false);
});
