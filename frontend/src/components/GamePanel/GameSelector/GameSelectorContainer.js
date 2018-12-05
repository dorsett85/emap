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
    this.handleSelectGameClick = this.handleSelectGameClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  handleSelectGameClick(e) {
    this.setState({
      anchorEl: e.currentTarget});
  }

  handleCardClick(e, i) {
    // Set as last selected game for this user
    ajax.setLastGame({
      userId: this.props.user.id,
      gameId: this.state.games[i].id,
      success: () => {}
    });

    this.props.setGame(this.state.games[i]);
    this.onClose();
  }

  onClose() {
    this.setState({
      anchorEl: null
    })
  }

  componentWillMount() {
    ajax.getGames({
      userId: this.props.user.id,
      success: data => {
        this.setState({
          games: data
        })
      }
    });
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
