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
      user: {
        id: null,
        name: null,
      },
      selectedGame: null,
      guessResults: null
    };

    // Bind methods
    this.updateGuessResults = this.updateGuessResults.bind(this);
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

  updateGuessResults(data) {
    this.setState({
      guessResults: data
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
          guessResults={this.state.guessResults}
          updateGuessResults={this.updateGuessResults}
          setGame={this.setGame}
          selectedGame={this.state.selectedGame}
        />
        <Map
          selectedGame={this.state.selectedGame}
          guessResults={this.state.guessResults}
        />
      </div>
    );
  }

}
