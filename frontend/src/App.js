import React from "react";
import ReactDOM from "react-dom";

import "./components/style.scss";

const App = () => {
  return <div>Hello React! This sucked setting, but now it's working</div>;
};

ReactDOM.render(<App />, document.getElementById("react-app"));