import React from "react";

import GamePanel from './GamePanel/GamePanel';
import Map from './Map/Map';

import 'assets/css/bulma.scss';
import 'assets/css/styles.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritePlaces: null,
      searchResults: null
    };

    // Bind methods
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  updateSearchResults(data) {
    this.setState({
      searchResults: data
    })
  }

  render() {
    return (
      <div>
        <GamePanel
          searchResults={this.state.searchResults}
          updateSearchResults={this.updateSearchResults}
        />
        <Map
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }

}