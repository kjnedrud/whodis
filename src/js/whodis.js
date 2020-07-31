/**
 * Who Dis?
 * Main JS for the game
 */

// library for generating bitmoji faces
import libmoji from 'libmoji';

// components
import Game from './components/Game.jsx';

// add event listener for New Game button
document.querySelector('#new-game').addEventListener('click', newGame);

// parse game data and initialize the game
if (document.querySelector('#game-data')) {
    let gameData = JSON.parse(document.querySelector('#game-data').innerHTML);
    initGame(gameData);
}

/**
 * New Game event handler
 * @param  {Event} e : Click event
 * @return {void}
 */
function newGame(e) {
    e.preventDefault();
    let characters = generateCharacters();
    let data = 'characters=' + encodeURIComponent(JSON.stringify(characters));
    let request = new XMLHttpRequest();
    request.open('POST', baseURL + '/new.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            let gameData = JSON.parse(this.response);
            document.querySelector('#input-code').setAttribute('value', gameData.code);
            window.history.replaceState({}, 'Who Dis?', `${baseURL}/?code=${gameData.code}`);

            initGame(gameData);
        }
    }

    request.onerror = function() {
        // todo: error handling
        console.log('Error creating new game');
    }

    request.send(data);
}

/**
 * Get a random character image
 * @return {String} Character image URL
 */
function getRandomImage() {

    // generate random image options
    let gender = libmoji.genders[libmoji.randInt(2)];
    // let style = libmoji.styles[libmoji.randInt(3)];
    let style = libmoji.styles[2];
    let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
    let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

    // build image url
    let image = libmoji.buildPreviewUrl('head', 2, gender[1], style[1], 0, traits, outfit);

    return image;
}

/**
 * Get a random character name
 * @return {String} Character name
 */
function getRandomName() {
    // todo: generate random name
    return 'Name';
}

/**
 * Generate a list of random characters with names and images
 * @param  {Number} count : How many characters to create (default 24)
 * @return {Array} characters : Array of character objects
 */
function generateCharacters(count = 24) {
    let characters = [];
    for (let i=0; i<count; i++) {
        characters.push({
            name: getRandomName(),
            image: getRandomImage(),
        });
    }
    return characters;
}

/**
 * Initialize the game and render the React game board
 * @param  {Object} gameData : Game code and character data
 * @return {void}
 */
function initGame(gameData) {

    if (gameData.characters) {
        const gameContainer = document.querySelector('#game');

        ReactDOM.render(<Game code={gameData.code} characters={gameData.characters} />, gameContainer);
    }
}
