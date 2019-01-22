import React from 'react';

// Custom components
import GamePanel from "./GamePanel";
import ajax from "assets/utils/ajaxRequests";


export default class GamePanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      currentGameId: '',
      fetching: true
    };

    // Bind methods
    this.handleGameSelect = this.handleGameSelect.bind(this);
  }

  handleGameSelect(e) {

    // Get game id depending on where click came from (e.g., initial modal or select menu)
    const gameId = e.target ? e.target.value : e;

    // Don't change anything if the game selected is the same
    if (gameId === this.state.currentGameId) {
      return;
    }

    const selectedGame = this.state.games.filter(v => v.id === gameId)[0];
    this.props.updateGuessResults({});

    // Set the select menu to the new game and start the progress bar
    this.setState({
      currentGameId: gameId,
      fetching: true
    });

    // Set the clicked on game with its progress
    ajax.getGameProgress({
      gameId: gameId,
      success: data => {
        this.props.setGame({
          ...selectedGame,
          ...data
        });

        // Set as last selected game for this user
        ajax.setLastGame({
          gameId: gameId
        });

      }
    });

  }

  componentDidMount() {
    ajax.getGames({
      success: data => {
        this.setState({
          games: data.games
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedGame.id !== this.props.selectedGame.id) {
      this.setState({
        currentGameId: this.props.selectedGame.id ? this.props.selectedGame.id : '',
        fetching: false
      })
    }
  }

  render() {
    return (
      <GamePanel
        user={this.props.user}
        games={this.state.games}
        currentGameId={this.state.currentGameId}
        fetching={this.state.fetching}
        handleGameSelect={this.handleGameSelect}
        setGameProgress={this.props.setGameProgress}
        selectedGame={this.props.selectedGame}
        guessResults={this.props.guessResults}
        updateGuessResults={this.props.updateGuessResults}
      />
    )
  }
}
