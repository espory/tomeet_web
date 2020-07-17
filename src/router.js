import React from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import LoginPage from "./Page/LoginPage";
import MainPage from "./Page/MainPage";

export default function App() {
  return (
    <div>
    <Router>
        <Switch>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

