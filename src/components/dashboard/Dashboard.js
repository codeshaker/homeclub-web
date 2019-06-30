import React, { Component } from "react";
import WorkerList from "../workers/WorkerList";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    const { workers } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6" />
          {/* for worker list */}
          <WorkerList workers={workers} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    workers: state.worker.workers
  };
};

export default connect(mapStateToProps)(Dashboard);
