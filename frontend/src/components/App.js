import React from "react";

// Custom components
import GamePanel from './GamePanel/GamePanel';
import Map from './Map/Map';

import ajax from 'assets/utils/ajaxRequests';
import 'assets/css/styles.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      selectedGame: null,
      user: null
    };

    // Bind methods
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user
    })
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

  componentWillMount() {

    // Get current logged in user and check for their last selected game
    ajax.getUser(user => {
      this.setUser(user);
      if (this.state.user) {
        ajax.getLastGame({
          userId: this.state.user.id,
          success: this.setGame
        })
      }
    });

  }

  render() {
    return (
      <div>
        <GamePanel
          user={this.state.user}
          setUser={this.setUser}
          searchResults={this.state.searchResults}
          updateSearchResults={this.updateSearchResults}
          setGame={this.setGame}
          selectedGame={this.state.selectedGame}
        />
        <Map
          selectedGame={this.state.selectedGame}
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }

}
