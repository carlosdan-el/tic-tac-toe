'use strict'

const root = document.getElementById('root');
const game = {
    'arrayBoard': [],
    'lengthOfBoard': 8,
    'maxPlayers': 2,
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
    'choiceInitialPlayer': () => {

        game.currentPlayer = Math.floor(Math.random() * game.maxPlayers);

    },
    'createArrayBoard': () => {

        while(game.arrayBoard.length <= game.lengthOfBoard){

            game.arrayBoard.push('');

        }

    },
    'renderBoardInNavigator': () => {

        let div = document.createElement('div');

        div.classList.add('board');

        for(let i = 0; i <= game.lengthOfBoard; i++){

            div.innerHTML += '<span class="table" ' +
            `onclick="game.makePlay(${i})"></span>`;

        }

        root.appendChild(div);

    },
    'makePlay': (position) => {
        
        if(game.arrayBoard[position] === '' && game.isGameOver === false){

            game.plays += 1;

            game.arrayBoard[position] = game.symbols[game.currentPlayer];

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
 
        game.renderLogo();
        game.renderScoreboard();
        game.renderBoardInNavigator();
        game.renderContainerResult();
        game.renderButtonRestart();
        game.choiceInitialPlayer();
        game.createArrayBoard();

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

        let result = document.getElementById('result');

        if(game.plays === 9){

            result.innerHTML = "Draaaaaaw!";

        }else{

            game.passToWin.forEach(function(index){

                if(game.arrayBoard[index[0]] === game.symbols[game.currentPlayer] &&
                    game.arrayBoard[index[1]] === game.symbols[game.currentPlayer] &&
                    game.arrayBoard[index[2]] === game.symbols[game.currentPlayer]){

                        game.isGameOver = true;
                        game.players[game.currentPlayer].victories += 1;
                        game.changeColor(index[0], index[1], index[2]);

                        result.innerHTML = `${game.symbols[game.currentPlayer]} wins!`;

                    }

            });

        }

    },
    'restart': () => {

        root.innerHTML = '';
        game.isGameOver = false;
        game.arrayBoard.fill(''); 
        game.plays = 0; 
        game.start();

    },
    'renderButtonRestart': () => {

        let container = document.createElement('div');
        let button = document.createElement('button');
        let content = document.createTextNode('Restart Game');

        container.classList.add('container');
        button.classList.add('btn');
        button.id = 'restart-game';
        button.title = "Restart Game";
        button.appendChild(content);
        button.onclick = () => {

            game.restart();

        }

        container.appendChild(button);

        root.appendChild(container);

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
            let playerData = document.createElement('span');

            div.classList.add('player-data');
            playerData.classList.add('player-data');

            playerData.innerHTML = `${element.name}: ${element.victories}`;

            div.appendChild(playerData);
            scoreboard.appendChild(div);

        });


        root.appendChild(scoreboard);


    },
    'renderContainerResult': () => {

        let div = document.createElement('div');

        div.id = 'result';

        root.appendChild(div);

    },
    'renderLogo': () => {

        let h1 = document.createElement('h1');
    
        h1.classList.add('logo');
        h1.innerHTML = "Tic Tac Toe";

        root.appendChild(h1);

    }
};

game.start();
