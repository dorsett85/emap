import React from "react";
import ReactDOM from "react-dom";

import App from './components/App';


ReactDOM.render(<App />, document.getElementById("react-app"));

// Hot reload for development
module.hot.accept();