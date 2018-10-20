import React from 'react';

import {Navigation} from "./Navigation";

export default class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGame: null
    };

    // Bind methods
    this.chooseGame = this.chooseGame.bind(this);
  }

  chooseGame(game) {
    this.setState({
      selectedGame: game
    })
  }

  render() {
    return (
      <Navigation game={this.chooseGame}/>
    )
  }

}