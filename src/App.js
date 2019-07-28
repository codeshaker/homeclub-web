import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import WorkerDashboard from "./components/dashboard/WorkerDashboard";
import MainDashboard from "./components/dashboard/MainDashboard";
import WorkerDetails from "./components/workers/WorkerDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateWorker from "./components/workers/CreateWorker";
import SearchWorker from "./components/search/SearchWorker";
import Payment from "./components/payment/payment";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainDashboard} />
          <Route exact path="/workerlist" component={WorkerDashboard} />
          <Route exact path="/worker/:id" component={WorkerDetails} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/createworker" component={CreateWorker} />
          <Route exact path="/searchworker" component={SearchWorker} />
          <Route exact path="/payment" component={Payment} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
