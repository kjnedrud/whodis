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
    this.state = {};
  }

  render() {
    let tiles = this.props.characters.map((character, index) => {
      return (<Tile key={index} character={character} />);
    });
    return (
      <div class="board">
        {tiles}
      </div>
    );
  }
}

export default Game;
