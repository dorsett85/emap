import React from 'react';

// Custom components
import GamePlay from './GamePlay';
import CitiesPop from './CityPop';
import CountryPop from './CountryPop';
import GamePlayTemp from './GamePlayTemp';

import ajax from 'assets/utils/ajaxRequests';


export default class GamePlayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameComponent: this.setGameComponent(),
      guessInput: '',
      showProgress: null
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setGameComponent() {
    // Render the appropriate game
    return props => {
      switch (this.props.selectedGame.name) {
        case 'cityPopTop10':
          return <CitiesPop {...props} />;
        case 'countryAreaTop10':
          return <CountryPop {...props}/>;
        default:
          return <GamePlayTemp {...props} />;
      }
    };
  }

  handleInput(e) {
    this.setState({
      guessInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    ajax.submitGuess({
      gameId: this.props.selectedGame.id,
      guess: this.state.guessInput,
      success: data => {

        this.props.updateGuessResults(data);
        this.setState(
          {showProgress: false},
          () => this.setState({showProgress: true}) // Reset showProgress so the grow animation fires
        );

        // Update the progress if there's a new correct guess
        if (data.new) {
          ajax.getGameProgress({
            gameId: this.props.selectedGame.id,
            success: this.props.setGameProgress
          });
        }

      }
    });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Reset showProgress on game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.setState({
        showProgress: null
      })
    }

  }

  render() {
    const Game = this.state.gameComponent;
    return (
      <GamePlay
        selectedGame={this.props.selectedGame}
        showProgress={this.state.showProgress}
        guessResults={this.props.guessResults}
      >
        <Game
          onInput={this.handleInput}
          onSubmit={this.handleSubmit}
          selectedGame={this.props.selectedGame}
          guessResults={this.props.guessResults}
        />
      </GamePlay>

    );
  }
}
