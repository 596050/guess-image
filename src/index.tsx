import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.less";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
