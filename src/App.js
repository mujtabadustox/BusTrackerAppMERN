import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage";

import Header from "./components/Header";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Homepage} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
};

export default App;
