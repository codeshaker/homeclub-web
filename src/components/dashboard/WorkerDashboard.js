import React, { Component } from "react";
import WorkerList from "../workers/WorkerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class WorkerDashboard extends Component {
  render() {
    const { workers, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signIn" />;

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
  console.log("in WorkerDashboard");
  console.log(state);
  return {
    //workers: state.firestore.ordered.workers
    workers: state.workers.workers,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "workers" }])
)(WorkerDashboard);
