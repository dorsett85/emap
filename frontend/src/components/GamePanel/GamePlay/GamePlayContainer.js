import React from 'react';

// Custom components
import GamePlay from "./GamePlay";
import csrf from 'assets/utils/getCsrfToken';


export default class GamePlayContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/', {
      method: 'POST',
      body: 'place=' + this.state.searchInput,
      headers: {
        "content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrf
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        this.props.updateSearchResults(data)
      })
      .catch(error => console.log(error))

  }

  render() {
    return (
      <GamePlay
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
        selectedGame={this.props.selectedGame}
        searchResults={this.props.searchResults}
      />
    )
  }
}
