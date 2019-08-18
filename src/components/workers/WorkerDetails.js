import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import WorkerCompleteBooking from "./WorkerCompleteBooking";
import WorkerTrialBooking from "./WorkerTrialBooking";

class WorkerDetails extends Component {
  render() {
    const { auth, worker } = this.props;

    if (!auth.uid) return <Redirect to="/signIn" />;

    // Will be used to show different details for cook and maid
    const workerType = worker ? worker.workerType : null;

    // Render when we are getting proper workerType
    if (worker) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <div className="card-image">
                <img
                  src={worker.imageUrl}
                  alt="text"
                  width="100dpx"
                  height="200dpx"
                />
              </div>
            </div>
            <div className="col s12 m5 offset-m1">
              <div>
                <span class="title">Name : {worker.name}</span>
                <br />
                <span class="title">Gender : {worker.gender}</span>
                <br />
                <span class="title">WorkerType : {worker.workerType}</span>
                <br />
              </div>
            </div>
          </div>
          <p> Complete Booking Section</p>
          <WorkerCompleteBooking worker={worker} auth={auth} />
          <br />
          <br />
          <p> Trial Booking Section</p>
          <WorkerTrialBooking worker={worker} auth={auth} />
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Error Loading Worker Details...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  console.log("workerDetails mapStateToProps id ", id);
  const workers = state.workers.workers;
  let worker = null;

  // Iterating the array of workers and choosing the worker based on id property matched.
  if (workers) {
    for (var i = 0; i < workers.length; i++) {
      if (workers[i].id === id) {
        worker = workers[i];
        break;
      }
    }
  }

  console.log("workerDetails mapStateToProps ", worker);
  return {
    worker: worker,
    user: state.user,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "workers"
    }
  ])
)(WorkerDetails);
