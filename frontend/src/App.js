import React from "react";
import ReactDOM from "react-dom";

import "./components/style.scss";

const App = () => {
  return <div>Hello React! This is finally working, and on production server</div>;
};

ReactDOM.render(<App />, document.getElementById("react-app"));