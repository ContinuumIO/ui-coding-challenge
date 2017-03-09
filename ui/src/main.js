import './index.scss';

import $ from 'jquery';

// import { alertHello } from './hello';

document.addEventListener('DOMContentLoaded', function(event) {
    // global state.
    var player1;
    var player2;
    var players;
    var currentPlayer;
    var tiles;
    var board;
    var endGame;
    var scores;
    var gameID;

    /**
     * Function to Start Game and Initialize all variables.
    **/
    function startGame() {

        // $('.restart').remove();
        // Clear any images currently in the tiles
        $('.tile').each(function() {
            $(this).empty();
        });

        player1 = "o";
        player2 = "x";
        players = [{symbol: player1, name:""}, {symbol: player2, name: ""}];
        currentPlayer = 0;
        tiles = 9;

        // @TODO: create new game on server
        // createGame()
        board = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
        endGame = false;

        scores = {
            row0: 0, // row0
            row1: 0, // row1
            row2: 0, // row2
            col0: 0, // col0
            col1: 0, // col1
            col2: 0, // col2
            diag0: 0, // diagonal from top-left to bottom-right
            diag1: 0 // diagnonal from top-right to bottom-left
        }
    }


    /**
     * Check if an image already exists in the selected tile
    **/
    function imageExists(jquery_element) {
        return jquery_element.children().length > 0;
    }


    /**
     * Check if a player has won the game
     * @param {int} tile - the index of the selected tile.
     *
     * returns true if a player has won or false if no player has won yet
    **/
    function winningPlay(tile) {
        // check for winner here
        // assign +1 to player 1 and -1 to player 2
        var weight = currentPlayer === 0 ? 1 : -1;
        var colIdx = tile%3;
        var rowIdx = Math.floor(tile/3);

        // Update row and check for win
        scores["row"+rowIdx] += weight;
        if(Math.abs(scores["row"+rowIdx]) === 3) {
            return true;
        }

        // Update col and check for win
        scores["col"+colIdx] += weight;
        if(Math.abs(scores["col"+colIdx]) === 3) {
            return true;
        }

        // If rowIdx and colIdx match, then you have the diagonal that starts
        // top-left to bottom-right (index 0,4,8 of the board)
        if(rowIdx === colIdx) {
            scores["diag0"] += weight;
            if(Math.abs(scores["diag0"]) === 3) {
                return true;
            }
        }

        // If rowIdx + colIdx add up to 2 then you have the diagnonal that
        // starts top-right to bottom-left (index 2,4,6 of the board)
        if (rowIdx + colIdx === 2) {
            scores["diag1"] += weight;
            if(Math.abs(scores["diag1"]) === 3) {
                return true;
            }
        }

        return false;
    }


    /**
     * Handle Game Over Scenario
     * @param {string} message - a custom message to display to the players.
     *
    **/
    function gameOver(message) {
        // @TODO: open model dialog to prompt user to continue playing
        // or add a restart game button
        endGame = true;
        console.log(message);

        $(".modal-content>h2").text(message);
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "block";
    }

    /**
     * Update game board
     * @param {int} index - The index of the selected tile.
     *
    **/
    function updateBoard(index) {
        // send ajax post request to update the board
        // for testing, update local board
        board[index] = currentPlayer;
    }

    // Click handler for any tile class
    $(document).on("click", ".tile", function() {
        console.log("Tile", this);

        if (endGame) return;

        if (!imageExists($(this))) {
            var tileNumber = $(".tile").index(this)+1;

            updateBoard(tileNumber-1);

            var imageName = players[currentPlayer].symbol + tileNumber + ".png";
            var img = $("<img>")
                .attr("src", "/static/images/" + imageName);
            $(this).html(img);

            if(winningPlay(tileNumber-1)) {
                var winningPlayer = currentPlayer+1;
                return gameOver("Player " + winningPlayer + " Wins!");
            }
            currentPlayer = (currentPlayer+1)%2; // switch players

            if(--tiles < 1) {
                return gameOver("Draw!");
            }
            console.log(tiles);
        }

    });

    $(document).on("click", ".restart", function() {
        startGame();
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "none";
    });

    $(document).on("click", "span", function() {
        var modal = document.getElementById("gameOverModal");
        modal.style.display = "none";
    });

    $(document).on("click", "#player-form", function(event) {
        event.preventDefault();
        // ajax post to save game
        var url = "/api/games";

        var player1Name = $("#player1").val().trim();
        var player2Name = $("#player2").val().trim();

        var game = {
            "players": [player1Name, player2Name],
            "board": board
        };
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(game),
            dataType: "json",
            contentType: "application/json"
        }).done(function(response) {
            console.log("response", response);
            console.log("game id: ", response.id);
            gameID = response.id;
            // @TODO: add get method to grab data from server
        });
    })

    startGame();
});
