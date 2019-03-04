import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/Login";
import MainPage from "./pages/MainPage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route path="/main" component={MainPage} />
        <Redirect to="/main" />
      </Switch>
    );
  }
}

export default App;
