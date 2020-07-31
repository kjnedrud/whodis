/**
 * Who Dis?
 * Main JS for the game
 */

// components
import Game from './components/Game.jsx';

const urlParams = new URLSearchParams(window.location.search);

// parse game data and initialize the game
if (document.querySelector('#game-data')) {
    let gameData = JSON.parse(document.querySelector('#game-data').innerHTML);
    initGame(gameData);
}

/**
 * Initialize the game and render the React game board
 * @param  {Object} gameData : Game code and character data
 * @return {void}
 */
function initGame(gameData) {

    const gameContainer = document.querySelector('#game');

    if (gameData) {
        ReactDOM.render(<Game code={gameData.code} characters={gameData.characters} />, gameContainer);
    } else {
        ReactDOM.render(<Game/>, gameContainer);
    }
}
