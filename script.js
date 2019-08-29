'use strict'

const root = document.getElementById('root');
const game = {
    'board': [],
    'lengthOfBoard': 8,
    'maxPlayers': 2, // just for a multiplayer game
    'symbols': ['X', 'O'],
    'players': [
        {
            'name': 'Player One',
            'victories': 0,
            'defeats': 0,
        },
        {
            'name': 'Player Two',
            'victories': 0,
            'defeats': 0,
        }
    ],
    'currentPlayer': 0,
    'initPlayer': () => {

        game.currentPlayer = Math.floor(Math.random() * game.maxPlayers);

    },
    'createBoard': () => {

        while(game.board.length <= game.lengthOfBoard){

            game.board.push('');

        }

    },
    'renderBoardInNavigator': () => {

        let content = '';

        for(let i = 0; i <= game.lengthOfBoard; i++){

            content += '<span class="table" ' +
            `onclick="game.makePlay(${i})"></span>`;

        }

        root.innerHTML = content;

    },
    'makePlay': (position) => {

        // check if the field is empty
        // check if the player was victory
        // check if gameover is true
        
        if(game.board[position] === '' && game.isGameOver === false){

            game.plays += 1;

            console.log('Jogada: ' + game.plays);

            game.board[position] = game.currentPlayer;

            game.whiteInBoard(position, game.symbols[game.currentPlayer]);

            game.checkPass();

            game.changePlayer();

        }

    },
    'isGameOver': false,
    'plays': 0,
    'whiteInBoard': (position, symbol) => {

        let table = document.getElementsByClassName('table');

        table[position].innerHTML = symbol;

    },
    'changePlayer': () => {

        if(game.currentPlayer === 0 || game.currentPlayer > game.maxPlayers){

                game.currentPlayer += 1;

        }else{

            game.currentPlayer -= 1;

        }

    },
    'start': () => {

        game.initPlayer(); // choice ramdomic the player
        game.createBoard(); // create a array with nine positions
        game.renderBoardInNavigator(); // render board on navigator '-'
        game.renderScoreboard();
        game.renderButtonRestart(); // yeah, you know what this function make...

        console.log('Fist player to play: ' + game.currentPlayer);

    },
    'passToWin': [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    'checkPass': () => {

        if(game.plays === 9){

            alert('draaaaaaaaaaaaaaaaaw!');

            game.restart();

        }else{

            game.passToWin.forEach(function(index){

                let som = game.board[index[0]] + game.board[index[1]] + 
                game.board[index[2]];

                if(som === 3){

                    game.isGameOver = true;
                    game.players[game.currentPlayer].victories +=1;
                    game.changeColor(index[0], index[1], index[2]);


                }else if(som === 0){

                    game.isGameOver = true;
                    game.players[game.currentPlayer].victories +=1;
                    game.changeColor(index[0], index[1], index[2]);

                }

            });

            // why? yeah, I don't know, after all it's just numbers xD (it make sense to me)

        }

    },
    'restart': () => {

        game.isGameOver = false;
        game.board.fill(''); // clean the content of array;
        game.plays = 0; // restart the count of plays
        game.start(); // create all content again

    },
    'renderButtonRestart': () => {

        let button = document.createElement('button');
        let content = document.createTextNode('Restart Game');

        button.classList.add('btn');
        button.id = 'restart-game';
        button.appendChild(content);
        button.onclick = () => {

            game.restart();

        }

        root.appendChild(button);

    },
    'changeColor': (positionOne, positionTwo, positionThree) => {

        let elements = document.getElementsByClassName('table');

        elements[positionOne].classList.add('winner-position');
        elements[positionTwo].classList.add('winner-position');
        elements[positionThree].classList.add('winner-position');


    },
    'renderScoreboard': () => {

        let scoreboard = document.createElement('section');

        scoreboard.classList.add('scoreboard');
       

        game.players.forEach(function(element){

            let div = document.createElement('div');
            let playerName = document.createElement('span');
            let playerVictories = document.createElement('span');

            playerName.classList.add('player-name');
            playerVictories.classList.add('player-victories');

            playerName.innerHTML = `Name: ${element.name}`;
            playerVictories.innerHTML = `Victories: ${element.victories}`;

            div.appendChild(playerName);
            div.appendChild(playerVictories);
            scoreboard.appendChild(div);

        });


        root.appendChild(scoreboard);


    }
};

game.start();
