/**
 * Who Dis?
 * Main JS for the game
 */

// add event listener for New Game button
document.querySelector('#new-game').addEventListener('click', newGame);

// parse game data and initialize the game
if (document.querySelector('#game-data')) {
    let gameData = JSON.parse(document.querySelector('#game-data').innerHTML);
    if (gameData) {
        initGame(gameData);
    }
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
    // todo: generate random image
    return 'http://placehold.it/100x100';
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
    for (let i=0; i<24; i++) {
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
    const gameContainer = document.querySelector('#game');
    let gameTitle = <h2>Game Code: {gameData.code}</h2>;
    let gameContent;

    if (gameData.characters) {
        gameContent = <Game characters={gameData.characters} />;
    } else {
        gameContent = <p class="error">Sorry, <b>{gameData.code}</b> is not a valid game code.</p>;
    }

    ReactDOM.render((<div>{gameTitle}{gameContent}</div>), gameContainer);
}
