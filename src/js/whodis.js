/**
 * Who Dis?
 * Main JS for the game
 */

// components
import Game from './components/Game.jsx';

// parse game data and initialize the game
if (document.querySelector('#game-data')) {
    let gameData = JSON.parse(document.querySelector('#game-data').innerHTML);
    let customGameSettings = null;

    if (!gameData.game) {
        const urlParams = new URLSearchParams(window.location.search);
        gameData.game = urlParams.get('game');
    }

    // check for custom game settings
    if (gameData.game && document.querySelector('#custom-game-settings')) {
        // parse custom game settings
        customGameSettings = JSON.parse(document.querySelector('#custom-game-settings').innerHTML);
        // map image urls in custom character list
        customGameSettings.characters = customGameSettings.characters.map(character => {
            character.image = `${baseURL}/assets/img/${gameData.game}/${character.image}`;
            return character;
        });
    }
    initGame(gameData, customGameSettings);
} else {
    initGame();
}

/**
 * Initialize the game and render the React game board
 * @param  {Object} gameData : Game code and character data
 * @return {void}
 */
function initGame(gameData = null, customGameSettings = null) {

    const gameContainer = document.querySelector('#game');
    if (gameData) {
        ReactDOM.render(<Game code={gameData.code} characters={gameData.characters} customGameSettings={customGameSettings} />, gameContainer);
    } else {
        ReactDOM.render(<Game customGameSettings={customGameSettings}/>, gameContainer);
    }
}
