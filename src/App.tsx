import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { VoteBoard } from "./view";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={VoteBoard} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
