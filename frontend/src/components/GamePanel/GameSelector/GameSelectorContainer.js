import React from 'react';

import GameSelector from "./GameSelector";

export default class GameSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [
        'Cities - Top 10 Population',
        'Cities - Top 10 Area',
        'Cities - Top 10 Education',
        'Cities - Top 10 Income'
      ],
      selectedGame: null,
      expandGames: false,
    };

    // Bind methods
    this.getGames = this.getGames.bind(this);
    this.handleSelectGameClick = this.handleSelectGameClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  getGames(game) {
    this.setState({
      selectedGame: game
    })
  }

  handleSelectGameClick() {
    this.setState({expandGames: !this.state.expandGames});
  }

  handleCardClick(e, i) {
    this.setState({
      selectedGame: this.state.games[i]
    });
    this.handleSelectGameClick();
  }

  componentWillMount() {
    // this.getGames('DATA')
  }

  render() {
    return (
      <GameSelector
        games={this.state.games}
        expandGames={this.state.expandGames}
        selectedGame={this.state.selectedGame}
        onSelectGameClick ={this.handleSelectGameClick}
        onCardClick={this.handleCardClick}
      />
    )
  }

}