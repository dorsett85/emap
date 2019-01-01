import React from "react";

// Custom components
import GamePanel from './GamePanel/GamePanel';
import Map from './Map/Map';

import ajax from 'assets/utils/ajaxRequests';
import 'assets/css/styles.scss';
import 'assets/css/third_party.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      selectedGame: {},
      guessResults: {
        data: {}
      }
    };

    // Bind methods
    this.setUser = this.setUser.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setGameProgress = this.setGameProgress.bind(this);
    this.updateGuessResults = this.updateGuessResults.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  setGame(game) {
    this.setState({
      selectedGame: game
    });
  }

  setGameProgress(data) {
    this.setState({
      selectedGame: {...this.state.selectedGame, ...data}
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

      // If a user and game is returned get the progress for that game
      if (user.id && user.last_played) {
        ajax.getGameProgress({
          gameId: user.last_played.id,
          success: data => {
            this.setGame({...user.last_played, ...data});
          }
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
          setGame={this.setGame}
          setGameProgress={this.setGameProgress}
          selectedGame={this.state.selectedGame}
          guessResults={this.state.guessResults}
          updateGuessResults={this.updateGuessResults}
        />
        <Map
          user={this.state.user}
          selectedGame={this.state.selectedGame}
          guessResults={this.state.guessResults}
        />
      </div>
    );
  }

}
