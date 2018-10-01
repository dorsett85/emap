import React from "react";
import ReactDOM from "react-dom";

import LeftMainPanel from './components/LeftMainPanel/LeftMainPanel';
import Map from './components/Map/Map';

const App = () => {
  return (
    <div>
      <LeftMainPanel/>
      <Map/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("react-app"));