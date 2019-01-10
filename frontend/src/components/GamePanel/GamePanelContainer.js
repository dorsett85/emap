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
    this.handleGameClick = this.handleGameClick.bind(this);
  }

  handleGameClick = gameId => () => {

    // Filter the game array by the clicked on panel and remove old guess results
    const selectedGame = this.state.games.filter(v => v.id === gameId)[0];
    this.props.updateGuessResults({data: {}});

    // Check if the clicked on game is different
    if (gameId !== this.props.selectedGame.id) {

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

    } else {
      // This is a click on the same game that collapses the panel, so de-select the game
      this.props.setGame({data: {}});
      ajax.setLastGame({
        gameId: 0
      });
    }

  };

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
        handleGameClick={this.handleGameClick}
        setGame={this.props.setGame}
        setGameProgress={this.props.setGameProgress}
        selectedGame={this.props.selectedGame}
        guessResults={this.props.guessResults}
        updateGuessResults={this.props.updateGuessResults}
      />
    )
  }
}
