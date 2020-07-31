'use strict';

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
      <h1>Who Dis?</h1>
    );

    if (this.props.code) {
      headerContent = (
        <>
          {headerContent}
          <h2>Game Code: {this.props.code}</h2>
        </>
      );
    }

    if (this.props.identity) {
      headerContent = (
        <>
          {headerContent}
          <div class="identity">
            <h3>Your Identity: <b>{this.props.identity.name}</b></h3>
            <img src={this.props.identity.image} width="100" />
          </div>
        </>
      );
    }

    return (
      <header>
        {headerContent}
      </header>
    );

  }
}

export default Header;
