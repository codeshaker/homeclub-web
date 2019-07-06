import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import WorkerDetails from "./components/workers/WorkerDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateWorker from "./components/workers/CreateWorker";
import SearchWorker from "./components/search/SearchWorker";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/worker/:id" component={WorkerDetails} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/createworker" component={CreateWorker} />
          <Route exact path="/searchworker" component={SearchWorker} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
