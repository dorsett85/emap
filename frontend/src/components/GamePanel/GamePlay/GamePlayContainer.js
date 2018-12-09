import React from 'react';

// Custom components
import GamePlay from "./GamePlay";

import ajax from 'assets/utils/ajaxRequests';


export default class GamePlayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessInput: ''
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      guessInput: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    ajax.submitGuess({
      gameId: this.props.selectedGame.id,
      gameName: this.props.selectedGame.name,
      guess: this.state.guessInput,
      success: this.props.updateGuessResults
    })

  }

  render() {
    return (
      <GamePlay
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
        selectedGame={this.props.selectedGame}
        guessResults={this.props.guessResults}
      />
    )
  }
}
