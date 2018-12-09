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
      selectedGame: {...this.state.selectedGame, progress: data.progress}
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
      this.setUser({id: user.id, name: user.name});
      this.setGame(user.game);

      // If a game is returned get the progress for that game
      if (user.game) {
        ajax.getGameProgress({
          gameId: this.state.selectedGame.id,
          success: this.setGameProgress
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
          setGameProgress={this.setGameProgress}
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
