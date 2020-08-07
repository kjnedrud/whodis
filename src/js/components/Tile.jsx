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
    this.props.onFlip(this.props.index, !this.props.visible);
  }

  render() {
    return (
      <div class={this.props.visible ? 'tile' : 'tile hidden'} onClick={this.flipTile} tabindex="0">
        <div class="front">
          <img src={this.props.character.image} width="100" height="100" />
          <b class="name">{this.props.character.name}</b>
        </div>
        <div class="back"></div>
      </div>
    );

  }
}

export default Tile;
