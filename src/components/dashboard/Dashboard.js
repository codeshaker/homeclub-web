import React, { Component } from "react";
import WorkerList from "../workers/WorkerList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
  console.log("in dashboard");
  console.log(state);
  return {
    workers: state.firestore.ordered.workers
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "workers" }])
)(Dashboard);
