'use strict';

// library for generating bitmoji faces
import libmoji from 'libmoji';

/**
 * Component: Footer
 * The game footer
 */
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.newGame = this.newGame.bind(this);
  }

  /**
   * New Game event handler
   * @param  {Event} e : Click event
   * @return {void}
   */
  newGame(e) {
      e.preventDefault();

      let characters = this.generateCharacters();
      let data = 'characters=' + encodeURIComponent(JSON.stringify(characters));
      if (this.props.customGameSettings) {
        data += '&game=' + this.props.customGameSettings.game;
      }
      let request = new XMLHttpRequest();
      request.open('POST', baseURL + '/new.php', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
              let gameData = JSON.parse(this.response);
              let gameURL = `${baseURL}/?code=${gameData.code}`;
              window.location = gameURL;
              // todo: update game data on current page instead of redirecting to new page
              // window.history.replaceState({}, 'Who Dis?', gameURL);
          }
      }

      request.onerror = function() {
          // todo: error handling
          console.log('Error creating new game');
      }

      request.send(data);
  }

  /**
   * Get a random character image
   * @return {String} Character image URL
   */
  getRandomImage() {

      // generate random image options
      let gender = libmoji.genders[libmoji.randInt(2)];
      // let style = libmoji.styles[libmoji.randInt(3)];
      let style = libmoji.styles[2];
      let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
      let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

      // build image url
      let image = libmoji.buildPreviewUrl('head', 2, gender[1], style[1], 0, traits, outfit);

      return image;
  }

  /**
   * Get a random character name
   * @return {String} Character name
   */
  getRandomName() {
      // todo: generate random name
      return 'Name';
  }

  /**
   * Generate a list of random characters with names and images
   * @param  {Number} count : How many characters to create (default 24)
   * @return {Array} characters : Array of character objects
   */
  generateCharacters(count = 24) {
    let characters = [];

    if (this.props.customGameSettings) {
      // randomize custom characters
      characters = this.props.customGameSettings.characters.sort(function(){
          return .5 - Math.random();
      }).slice(0, count);
    } else {
      // generate random characters for default game
      for (let i=0; i<count; i++) {
        characters.push({
            name: this.getRandomName(),
            image: this.getRandomImage(),
        });
      }
    }
    return characters;
  }

  render() {
    return (
      <footer>
        <div>
          <h2>Join or Continue</h2>
          <form action={baseURL} method="get">
              <p>
                  <label for="input-code">Game Code</label>
                  <input id="input-code" name="code" placeholder="4-Letter Code" defaultValue={this.props.code} type="text" />
              </p>
              <button class="button" type="submit">Join Game</button>
          </form>
        </div>
        <div>
          <h2>New Game</h2>
          <button id="new-game" class="button" onClick={this.newGame}>Start New Game</button>
        </div>
      </footer>
    );
  }
}

export default Footer;
