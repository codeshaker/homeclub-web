import React from "react";

const WorkerSummary = ({ worker }) => {
  return (
    <div className="card horizontal">
      <div className="card-image">
        <img src={worker.imagePath} alt="text" />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <span class="title">Name : {worker.name}</span>
          <br />
          <span class="title">Gender : {worker.gender}</span>
          <br />
          <span class="title">Worker Type : {worker.workerType}</span>
          <br />
          <span class="title">
            Aadhar Verified : {worker.aadharVerified} |{" "}
          </span>
          <span class="title">Police Verified : {worker.policeVerified}</span>
        </div>
        <div class="card-action">
          <a href="/worker1">Hire | Book</a>
        </div>
      </div>
    </div>
  );
};

export default WorkerSummary;
