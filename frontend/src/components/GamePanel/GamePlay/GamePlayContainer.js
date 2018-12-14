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
      guessInput: '',
      guessMessage: ''
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
      gameName: this.props.selectedGame.name,
      guess: this.state.guessInput,
      success: data => {

        // Update the guess results and add a message for the guess
        this.props.updateGuessResults(data);
        this.setState({
          guessMessage: data.msg
        });

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

  componentDidUpdate(prevProps, prevState) {

    // Remove the guess message on user change and game change
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.setState({
        guessMessage: '',
        guessInput: ''
      });
    }

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
          guessMessage={this.state.guessMessage}
        />
      </GamePlay>

    );
  }
}
