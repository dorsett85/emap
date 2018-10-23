import React from "react";

// Custom components
import GamePanel from './GamePanel/GamePanel';
import Map from './Map/Map';

import 'assets/css/styles.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      selectedGame: '',
      user: null
    };

    // Bind methods
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.setGame = this.setGame.bind(this);
  }

  setGame(game) {
    this.setState({
      selectedGame: game
    })
  }

  updateSearchResults(data) {
    this.setState({
      searchResults: data
    })
  }

  render() {
    return (
      <div>
        <GamePanel
          searchResults={this.state.searchResults}
          updateSearchResults={this.updateSearchResults}
          setGame={this.setGame}
          selectedGame={this.state.selectedGame}
        />
        <Map
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }

}