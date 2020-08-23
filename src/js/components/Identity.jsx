'use strict';

/**
 * Component: Tile
 * An individual character tile with image and name
 */
class Identity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: '',
    };

    this.expand = this.expand.bind(this);
    this.minimize = this.minimize.bind(this);
  }

  expand(e) {
    // adjust size based on current size
    let newSize = this.state.size;
    if (this.state.size == 'minimized') {
      newSize = '';
    } else if (this.state.size == '') {
      newSize = 'expanded';
    }
    // update react state
    this.setState(prevState => {
        return {size: newSize};
    });
  }

  minimize(e) {
    // adjust size based on current size
    let newSize = this.state.size;
    if (this.state.size == '') {
      newSize = 'minimized';
    } else if (this.state.size == 'expanded') {
      newSize = '';
    }
    // update react state
    this.setState(prevState => {
        return {size: newSize};
    });
  }

  render() {
    return (
      <div className={'identity ' + this.state.size}>
        <h3>Your Identity: <b>{this.props.identity.name}</b></h3>
        <img src={this.props.identity.image} width="100" />
        <p>
          <button className="control" title="Minimize" onClick={this.minimize}>-</button>
          <button className="control" title="Expand" onClick={this.expand}>+</button>
        </p>
      </div>
    );
  }
}

export default Identity;
