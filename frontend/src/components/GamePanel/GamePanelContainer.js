import React from 'react';

// Custom components
import GamePanel from "./GamePanel";
import ajax from "assets/utils/ajaxRequests";


export default class GamePanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };

    // Bind methods
    this.handleGameSelect = this.handleGameSelect.bind(this);
  }

  handleGameSelect(e) {

    // Get game id depending on where click came from
    const gameId = e.target ? e.target.value : e;
    const selectedGame = this.state.games.filter(v => v.id === gameId)[0];
    this.props.updateGuessResults({data: {}});

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

  render() {
    return (
      <GamePanel
        user={this.props.user}
        games={this.state.games}
        expanded={this.state.expanded}
        handleGameSelect={this.handleGameSelect}
        setGame={this.props.setGame}
        setGameProgress={this.props.setGameProgress}
        selectedGame={this.props.selectedGame}
        guessResults={this.props.guessResults}
        updateGuessResults={this.props.updateGuessResults}
      />
    )
  }
}
