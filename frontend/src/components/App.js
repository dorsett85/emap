import React from "react";

// Custom components
import GamePanel from './GamePanel/GamePanel';
import Map from './Map/Map';

import 'assets/css/styles.scss';
import csrf from "assets/utils/getCsrfToken";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      selectedGame: '',
      user: null
    };

    // Bind methods
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    console.log(user);
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
    fetch('/api/login/', {
      method: 'POST',
      // body: `username=${this.state.username}&password=${this.state.password}`,
      headers: {
        "content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        this.setUser(data);
        // location.reload(); // Reload the page so the csrf token resets!!
      })
      .catch(error => console.log(error));
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
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }

}