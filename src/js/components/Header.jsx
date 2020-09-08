'use strict';

import Identity from './Identity.jsx';

/**
 * Component: Header
 * The game header
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let headerContent = (
            <h1>{this.props.title}</h1>
        );

        if (this.props.code) {
            headerContent = (
                <>
                    {headerContent}
                    <h2>Game Code: <span class="code">{this.props.code}</span></h2>
                </>
            );
        }

        if (this.props.identity) {
            return (
                <>
                    <header>{headerContent}</header>
                    <Identity identity={this.props.identity} />
                </>
            );
        } else {
            return <header className={this.props.code ? '' : 'simple'}>{headerContent}</header>;
        }

    }
}

export default Header;
