import React, { Component } from "react";
import WorkerList from "../workers/WorkerList";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6" />
          {/* for worker list */}
          <WorkerList />
          <div className="col s12 m5 offset-m1" />
          {/* for notifications*/}
        </div>
      </div>
    );
  }
}

export default Dashboard;
