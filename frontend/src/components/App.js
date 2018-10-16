import React from "react";

import LeftMainPanel from './LeftMainPanel/LeftMainPanel';
import Map from './Map/Map';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritePlaces: null,
      searchResults: null
    }

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
        <LeftMainPanel
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