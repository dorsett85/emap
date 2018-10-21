import React from 'react';

import GameSelector from "./GameSelector";

export default class GameSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [
        'Cities - Top 100 Population',
        'Cities - Top 100 Area',
        'Cities - Top 100 Income'
      ],
      selectedGame: null,
      anchorEl: null,
    };

    // Bind methods
    this.getGames = this.getGames.bind(this);
    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getGames(game) {
    this.setState({
      selectedGame: game
    })
  }

  handleClickListItem(e) {
    this.setState({anchorEl: e.currentTarget});
  }

  handleMenuItemClick(e) {
    this.setState({
      selectedGame: e.currentTarget.textContent,
      anchorEl: null
    });
  }

  handleClose() {
    this.setState({anchorEl: null});
  }

  componentWillMount() {
    // this.getGames('DATA')
  }

  render() {
    return (
      <GameSelector
        games={this.state.games}
        selectedGame={this.state.selectedGame}
        selectedIndex={this.state.selectedIndex}
        anchorEl={this.state.anchorEl}
        onClickListItem={this.handleClickListItem}
        onMenuItemClick={this.handleMenuItemClick}
        onClose={this.handleClose}
      />
    )
  }

}