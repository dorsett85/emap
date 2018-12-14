import React from 'react';

// Custom components
import GameSelector from './GameSelector';

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
      anchorEl: e.currentTarget
    });
  }

  handleCardClick(e, i) {

    // Check if the clicked on game is different
    if (this.state.games[i].id !== this.props.selectedGame.id) {

      // Remove the guess result
      this.props.updateGuessResults({data: {}});

      // Set the clicked on game with its progress
      ajax.getGameProgress({
        gameId: this.state.games[i].id,
        success: data => {
          this.props.setGame({
            ...this.state.games[i],
            ...data
          });

          // Set as last selected game for this user
          ajax.setLastGame({
            gameId: this.state.games[i].id
          });

        }
      });

    }

    this.onClose();
  }

  onClose() {
    this.setState({
      anchorEl: null
    });
  }

  componentWillMount() {
    ajax.getGames({
      success: data => {
        this.setState({
          games: data.games
        });
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
    );
  }

}
