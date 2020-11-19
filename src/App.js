import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Case, Login } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route path="/case/:caseId" component={Case} />
    </Router>
  );
}

export default App;
