import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Case } from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route path="/case/:caseId" component={Case} />
    </Router>
  );
}

export default App;
