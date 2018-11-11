import React from 'react';

// Custom components
import GamePlay from "./GamePlay";

import ajax from 'assets/utils/ajaxRequests';


export default class GamePlayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    ajax.getPlace(this.state.searchInput, data => {
      this.props.updateSearchResults(data)
    })

  }

  render() {
    return (
      <GamePlay
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
        selectedGame={this.props.selectedGame}
        searchResults={this.props.searchResults}
      />
    )
  }
}
