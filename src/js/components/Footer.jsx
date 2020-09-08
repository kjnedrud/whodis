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
        this.state = {
            loading: false,
            errorMessage: null,
        };
        this.newButtonClick = this.newButtonClick.bind(this);
        this.joinSubmit = this.joinSubmit.bind(this);
    }

    /**
     * New Game Button click event handler
     * @param    {Event} e : Click event
     * @return {void}
     */
    newButtonClick(e) {
        e.preventDefault();

        this.setState(prevState => {
            return {loading: true};
        })

        this.newGame();
    }

    /**
     * Join Game form submit event handler
     * @param  {Event} e : Submit event
     * @return {void}
     */
    joinSubmit(e) {

        this.setState(prevState => {
            return {loading: true};
        })
    }

    /**
     * Generate characters and create a new game
     * @return {void}
     */
    newGame() {

        let characters = this.generateCharacters();
        let data = 'characters=' + encodeURIComponent(JSON.stringify(characters));
        if (this.props.customGameSettings) {
            data += '&game=' + this.props.customGameSettings.game;
        }
        let request = new XMLHttpRequest();
        request.open('POST', baseURL + '/new.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        request.onreadystatechange = () => {

            if(request.readyState === XMLHttpRequest.DONE) {
                let status = request.status;
                let response = request.response;
                if (status === 0 || (status >= 200 && status < 400)) {
                    let gameData = JSON.parse(response);
                    let gameURL = `${baseURL}/?code=${gameData.code}`;
                    window.location = gameURL;
                    // todo: update game data on current page instead of redirecting to new page
                    // window.history.replaceState({}, 'Who Dis?', gameURL);
                } else {
                    this.setState(prevState => {
                        return {errorMessage: 'Error creating new game.'};
                    })
                    console.log(response);
                }
            }
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
         * @param    {String} traitName    : Name of the trait to disable
         * @param    {Int} percentage : Chance that the trait will be disabled, as a percentage out of 100
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
     * @param    {Number} count : How many characters to create (default 24)
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

        let newGameError = this.state.errorMessage ? <p className="error-message">{this.state.errorMessage}</p> : '';
        let loadingGame = this.state.loading ? <p className="loading-message">Loading game...</p> : '';

        return (
            <footer>
                <div class="forms">
                    <section>
                        <h2>New Game</h2>
                        <p>Create a new game to play with a friend!</p>
                        <button id="new-game" className="button" onClick={this.newButtonClick} disabled={this.state.loading}>Start New Game</button>
                        {newGameError}
                    </section>
                    <section>
                        <h2>Join or Continue</h2>
                        <form action={baseURL} method="get" onSubmit={this.joinSubmit}>
                            <p>
                                <label htmlFor="input-code">Game Code</label>
                                <input id="input-code" name="code" placeholder="4-Letter Code" defaultValue={this.props.code} type="text" readOnly={this.state.loading} />
                            </p>
                            <button className="button" type="submit" disabled={this.state.loading}>Join Game</button>
                        </form>
                    </section>
                </div>
                {loadingGame}
                <div class="bottom-bar">
                    <hr/>
                    <p class="small-text"><b>Who Dis?</b> is a project by <a href="https://www.kirstenjnedrud.com/" target="_blank">Kirsten Nedrud</a> and is in no way affiliated with, authorized, maintained, sponsored or endorsed by Hasbro, Bitmoji, or any affiliates or subsidiaries. <a href="https://github.com/kjnedrud/whodis" target="_blank">Git&nbsp;Repo</a></p>
                </div>
            </footer>
        );
    }
}

export default Footer;
