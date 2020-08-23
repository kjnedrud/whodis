'use strict';

// library for generating bitmoji faces
import libmoji from 'libmoji';

// list of gender neutral first names
import names from '../names';

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
      let style = libmoji.styles[2];
      let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
      let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

      /**
       * Randomly disable a trait based on a weighted percentage
       * A percentage of 0 will never disable the trait and a percentage of 100 will always disble it
       * @param  {String} traitName  : Name of the trait to disable
       * @param  {Int} percentage : Chance that the trait will be disabled, as a percentage out of 100
       * @return {void}
       */
      function maybeDisableTrait(traitName, percentage = 50) {

        if (Math.random() * 100 < percentage) {
          let traitIndex = traits.findIndex(trait => trait[0] == traitName);
          if (traitIndex != -1) {
            traits[traitIndex][1] = -1;
          }
        }
      }

      // adjust traits so not everyone has a hat, glasses, beard, etc.
      maybeDisableTrait('beard', 33);
      maybeDisableTrait('glasses', 50);
      maybeDisableTrait('hat', 66);
      maybeDisableTrait('face_lines', 66);
      maybeDisableTrait('cheek_details', 50);
      maybeDisableTrait('hair_treatment_tone', 66);

      // build image url
      let image = libmoji.buildPreviewUrl('head', 2, gender[1], style[1], 0, traits, outfit);

      return image;
  }

  /**
   * Get a random character name
   * @return {String} Character name
   */
  getRandomName() {
      return names[Math.floor(Math.random() * names.length)];
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
        let newCharacter = {
            name: this.getRandomName(),
            image: this.getRandomImage(),
        };
        // make sure there are no duplicate names
        while (characters.map(char => char.name).includes(newCharacter.name)) {
          newCharacter.name = this.getRandomName();
        }
        characters.push(newCharacter);
      }
    }
    return characters;
  }

  render() {
    return (
      <footer>
        <div>
          <h2>New Game</h2>
          <p>Create a new game and to play with a friend!</p>
          <button id="new-game" className="button" onClick={this.newGame}>Start New Game</button>
        </div>
        <div>
          <h2>Join or Continue</h2>
          <form action={baseURL} method="get">
              <p>
                  <label htmlFor="input-code">Game Code</label>
                  <input id="input-code" name="code" placeholder="4-Letter Code" defaultValue={this.props.code} type="text" />
              </p>
              <button className="button" type="submit">Join Game</button>
          </form>
        </div>
      </footer>
    );
  }
}

export default Footer;
