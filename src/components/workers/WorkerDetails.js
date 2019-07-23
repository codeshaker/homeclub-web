import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const WorkerDetails = props => {
  const { worker, auth } = props;
  if (worker) {
    if (!auth.uid) return <Redirect to="/signIn" />;

    return (
      <div className="container section project-details">
        <span class="title">Name : {worker.name}</span>
        <br />
        <span class="title">Gender : {worker.gender}</span>
        <br />
        <span class="title">WorkerType : {worker.workerType}</span>
        <br />
        <span class="title">Aadhar Verified : {worker.isAadharVerified}</span>
        <br />
        <span class="title">Police Verified : {worker.isPoliceVerified}</span>
        <br />
        <span class="title">Speciality : {worker.speciality}</span>
        <br />
        <span class="title">Language : {worker.language}</span>
        <br />
        <span class="title">Package : {worker.package}</span>
        <br />
        <span class="title">TimeSlot 1</span>
        <span class="title">TimeSlot 2</span>

        <span class="title">Cost</span>
        <br />
        <span class="title">No. of Person | Bhk </span>
        <br />
        <span class="title">Book | Quit</span>
        <br />
        <span class="title">Share</span>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading Worker Details...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const workers = state.firestore.data.workers;
  const worker = workers ? workers[id] : null;
  return {
    worker: worker,
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
