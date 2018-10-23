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
      anchorEl: null,
    };

    // Bind methods
    this.getGames = this.getGames.bind(this);
    this.handleSelectGameClick = this.handleSelectGameClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  getGames(games) {
    this.setState({
      games: games
    })
  }

  handleSelectGameClick(e) {
    this.setState({
      anchorEl: e.currentTarget});
  }

  handleCardClick(e, i) {
    this.props.setGame(this.state.games[i]);
    this.onClose();
  }

  onClose() {
    this.setState({
      anchorEl: null
    })
  }

  componentWillMount() {
    // this.getGames('DATA')
  }

  render() {
    return (
      <GameSelector
        games={this.state.games}
        anchorEl={this.state.anchorEl}
        onSelectGameClick={this.handleSelectGameClick}
        onCardClick={this.handleCardClick}
        onClose={this.onClose}
      />
    )
  }

}