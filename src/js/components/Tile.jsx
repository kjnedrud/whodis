'use strict';

/**
 * Component: Tile
 * An individual character tile with image and name
 */
class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.flipTile = this.flipTile.bind(this);
  }

  flipTile(e) {
    this.setState(state => ({
      visible: !state.visible
    }));
  }

  render() {
    let tileClass = 'tile';
    let tileContent = '';

    if (this.state.visible) {
      tileContent = (
        <div>
          <img src={this.props.character.image} width="100" height="100" />
          <b class="name">{this.props.character.name}</b>
        </div>
      );
    } else {
      tileClass += ' hidden';
    }

    return (
      <div class={tileClass} onClick={this.flipTile}>
        {tileContent}
      </div>
    );

  }
}

export default Tile;
