import React from "react";
import { Route } from "react-router-dom";

import Home from "./screens/Home";
import Game from "./screens/Game";
import Result from "./screens/Result";

const App = () => (
  <div>
    <Route exact path="/result" component={Result} />
    <Route exact path="/game" component={Game} />
    <Route exact path="/" component={Home} />
  </div>
);

export default App;
