'use strict';

/**
 * Component: Tile
 * An individual character tile with image and name
 */
class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.flipTile = this.flipTile.bind(this);
  }

  flipTile(e) {
    this.props.onFlip(this.props.index, !this.props.character.visible);
  }

  render() {
    let tileClass = 'tile';
    let tileContent = '';

    if (this.props.character.visible) {
      tileContent = (
        <>
          <img src={this.props.character.image} width="100" height="100" />
          <b class="name">{this.props.character.name}</b>
        </>
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
