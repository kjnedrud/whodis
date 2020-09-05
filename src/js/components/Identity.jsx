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
        // update react state
        this.setState(prevState => {
            return {size: 'expanded'};
        });
    }

    minimize(e) {
        // update react state
        this.setState(prevState => {
                return {size: ''};
        });
    }

    render() {
        return (
            <div className={'identity ' + this.state.size}>
                <h3>Your Identity: <b>{this.props.identity.name}</b></h3>
                <img src={this.props.identity.image} height="100" />
                <p>
                    <button className="control" title="Minimize" style={{display: this.state.size == 'expanded' ? null : 'none'}} onClick={this.minimize}>-</button>
                    <button className="control" title="Expand" style={{display: this.state.size == 'expanded' ? 'none' : null}} onClick={this.expand}>+</button>
                </p>
            </div>
        );
    }
}

export default Identity;
