'use strict';

// components
import Tile from './Tile.jsx';

/**
 * Component: Game
 * The main game board - displays a grid of characters
 */
class Game extends React.Component {

    constructor(props) {
        super(props);

        if (props.code && props.characters) {
            // load the current game state
            let gameState = this.loadGameState();

            this.state = {
                tiles: props.characters.map((character, index) => {
                    return {
                        character: character,
                        visible: gameState.tileVisibility[index],
                    };
                }),
                identity: props.characters[gameState.characterIndex],
                saved: gameState,
            };
        }

        this.updateTileState = this.updateTileState.bind(this);
    }

    /**
     * Create a new saved game state and save it to local storage
     * @param  {Array} characters : list of characters
     * @return {Object} gameState
     */
    newGameState(characters) {
        // create a new game state
        let gameState = {
            // pick a random character
            characterIndex: Math.floor(Math.random() * characters.length),
            // all tiles are visible to start
            tileVisibility: characters.map(character => true),
        };

        // save to local storage
        this.saveGameState(gameState);

        return gameState;
    }

    /**
     * Load the saved game state from local storage, or create a new game state
     * @return {Object}
     */
    loadGameState() {
        // check local storage for a saved game state
        let gameState = window.localStorage.getItem(this.props.code);

        if (gameState) {
            gameState = JSON.parse(gameState);
        } else {
            // create a new game state
            gameState = this.newGameState(this.props.characters);
        }

        return gameState;
    }

    /**
     * Save the current game state to local storage
     * @param  {Object} gameState
     * @return {void}
     */
    saveGameState(gameState) {
        // update local storage with new game state
        window.localStorage.setItem(this.props.code, JSON.stringify(gameState));
    }

    /**
     * Update the state of a specific tile
     * @param  {Integer} index : the index of the tile to update
     * @param  {Boolean} visible : whether the tile is visible or not
     * @return {void}
     */
    updateTileState(index, visible) {

        // update react state
        this.setState(prevState => {
            let newTiles = [...prevState.tiles];
            newTiles[index].visible = visible;
            return {tiles: newTiles};
        });

        // update the game state and save to local storage
        let newGameState = {...this.state.saved};
        newGameState.tileVisibility[index] = visible;
        this.saveGameState(newGameState);
    }

    /**
     * Render function for the Game component
     * @return {} gameContent : React element for the game
     */
    render() {

        let gameTitle = <h2>Game Code: {this.props.code}</h2>;
        let gameContent;

        if (this.state.tiles) {

            let tiles = this.state.tiles.map((tile, index) => {
              return (<Tile key={index} index={index} character={tile.character} visible={tile.visible} onFlip={this.updateTileState} />);
            });

            gameContent = (
                <>
                    {gameTitle}
                    <div class="board">
                        {tiles}
                    </div>
                </>
            );
        } else {
            gameContent = (
                <>
                    {gameTitle}
                    <p class="error">Sorry, <b>{this.props.code}</b> is not a valid game code.</p>
                </>
            );
        }

        return gameContent;
    }
}

export default Game;
