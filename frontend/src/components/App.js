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
      user: {},
      selectedGame: {},
      gameProgress: [],
      guessResults: {}
    };

    // Bind methods
    this.updateGuessResults = this.updateGuessResults.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setGameProgress = this.setGameProgress.bind(this);
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

  setGameProgress(data) {
    this.setState({
      gameProgress: data
    })
  }

  updateGuessResults(data) {
    this.setState({
      guessResults: data
    })
  }

  componentWillMount() {

    // Get current logged in user information
    ajax.getUser(user => {
      this.setUser(user);
      if (user.id) {
        this.setGame(user.last_played);

        // If a game is returned get the progress for that game
        if (user.last_played) {
          ajax.getGameProgress({
            gameId: this.state.selectedGame.id,
            success: data => this.setGameProgress(data.progress)
          })
        }
      }
    });

  }

  render() {
    return (
      <div>
        <GamePanel
          user={this.state.user}
          setUser={this.setUser}
          setGame={this.setGame}
          setGameProgress={this.setGameProgress}
          selectedGame={this.state.selectedGame}
          gameProgress={this.state.gameProgress}
          guessResults={this.state.guessResults}
          updateGuessResults={this.updateGuessResults}
        />
        <Map
          user={this.state.user}
          selectedGame={this.state.selectedGame}
          gameProgress={this.state.gameProgress}
          guessResults={this.state.guessResults}
        />
      </div>
    );
  }

}
