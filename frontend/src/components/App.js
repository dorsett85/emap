import React from "react";

import LeftMainPanel from './LeftMainPanel/LeftMainPanel';
import Map from './Map/Map';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null
    }
  }

  render() {
    return (
      <div>
        <LeftMainPanel/>
        <Map/>
      </div>
    );
  }

};