import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import createApolloClient from "./apollo";

import Header from "./components/Header";

import Dashboard from "./views/Dashboard";
import GameView from "./views/GameView";
import ProjectView from "./views/ProjectView";

const apolloClient = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/project/:projectId/game/:gameId">
            <GameView />
          </Route>
          <Route path="/project/:projectId">
            <ProjectView />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
