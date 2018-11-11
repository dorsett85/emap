import React from 'react';

// Custom components
import GameSelector from "./GameSelector";

import ajax from 'assets/utils/ajaxRequests';

export default class GameSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
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
    this.props.setGame(this.state.games[i].name);
    this.onClose();
  }

  onClose() {
    this.setState({
      anchorEl: null
    })
  }

  componentWillMount() {
    ajax.getGames(this.getGames)
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
