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

        if (this.state.size == 'expanded') {
            // expanded
            return (
                <div className={'identity ' + this.state.size}>
                    <h3>Your Identity: <b>{this.props.identity.name}</b></h3>
                    <img src={this.props.identity.image} height="100" />
                    <button className="close" title="Minimize" onClick={this.minimize}>&times;</button>
                </div>
            );
        } else {
            // thumbnail - click to expand
            return (
                <div className={'identity ' + this.state.size}>
                    <h3>Your Identity: <b>{this.props.identity.name}</b></h3>
                    <button className="expand" title="Expand" onClick={this.expand}>
                        <img src={this.props.identity.image} class="thumbnail" height="100" alt="View Larger" />
                    </button>
                </div>
            );
        }
    }
}

export default Identity;
