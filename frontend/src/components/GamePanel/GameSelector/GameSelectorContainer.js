import React from 'react';

import GameSelector from "./GameSelector";

export default class GameSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      selectedGame: ''
    };

    // Bind methods
    this.getGames = this.getGames.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getGames(game) {
    this.setState({
      selectedGame: game
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <GameSelector
        games={this.state.games}
        selectedGame={this.state.selectedGame}
        onChange={this.handleChange}
      />
    )
  }

}