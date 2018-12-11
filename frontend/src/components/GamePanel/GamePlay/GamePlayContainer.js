import React from 'react';

// Custom components
import GamePlay from './GamePlay';
import CitiesPop from './CitiesPop';
import GamePlayTemp from './GamePlayTemp';

import ajax from 'assets/utils/ajaxRequests';


export default class GamePlayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameComponent: this.setGameComponent(),
      guessInput: ''
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setGameComponent() {
    // Render the appropriate game
    const game = props => {
      switch (this.props.selectedGame.name) {
        case 'cityPopTop10':
          return <CitiesPop {...props} />;
        default:
          return <GamePlayTemp {...props} />;
      }
    };
    return game;
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
      gameName: this.props.selectedGame.name,
      guess: this.state.guessInput,
      success: data => {

        // TODO more functionality for dealing with the returned data object (e.g., result message)
        this.props.updateGuessResults(data.results ? data.results : '');

        // Update the progress if there's a new correct guess
        ajax.getGameProgress({
          gameId: this.props.selectedGame.id,
          success: this.props.setGameProgress
        });

      }
    });

  }

  render() {
    const Game = this.state.gameComponent;
    return (
      <GamePlay
        selectedGame={this.props.selectedGame}
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
