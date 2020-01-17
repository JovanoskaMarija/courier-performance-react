import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ReportPage from "./components/ReportPage";

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/report-page">
              <ReportPage />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
