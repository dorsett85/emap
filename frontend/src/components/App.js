import React from "react";
import { hot } from 'react-hot-loader';

import LeftMainPanel from './LeftMainPanel/LeftMainPanel';
import Map from './Map/Map';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritePlaces: null,
      searchResults: null
    }
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
          updateSearchResults={this.updateSearchResults.bind(this)}
        />
        <Map
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }

}

export default hot(module)(App)