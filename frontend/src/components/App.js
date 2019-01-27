import React from "react";

// Custom components
import GamePanelContainer from "./GamePanel/GamePanelContainer";
import Landing from './Landing/Landing';
import LoginContainer from "./Landing/Login/LoginContainer";
import RegisterContainer from "./Landing/Register/RegisterContainer";
import LogoutContainer from "./Landing/Logout/LogoutContainer";
import Map from './Map/Map';
import SnackbarContainer from './Snackbar/SnackbarContainer';

import ajax from 'assets/utils/ajaxRequests';
import 'assets/css/styles.scss';
import 'assets/css/third_party.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      selectedGame: {},
      guessResults: {}
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
    })
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

  componentDidMount() {
    // Get current logged in user information
    ajax.getUser(user => this.setUser(user));
  }

  render() {
    return (
      <div>
        <GamePanelContainer
          user={this.state.user}
          setGame={this.setGame}
          setGameProgress={this.setGameProgress}
          selectedGame={this.state.selectedGame}
          guessResults={this.state.guessResults}
          updateGuessResults={this.updateGuessResults}
        />
        <Landing user={this.state.user}>
          <LoginContainer
            setUser={this.setUser}
          />
          <RegisterContainer
            setUser={this.setUser}
          />
          <LogoutContainer
            setUser={this.setUser}
            setGame={this.setGame}
          />
        </Landing>
        <Map
          user={this.state.user}
          selectedGame={this.state.selectedGame}
          guessResults={this.state.guessResults}
        />
        <SnackbarContainer
          user={this.state.user}
          guessResults={this.state.guessResults}
        />
      </div>
    );
  }

}
