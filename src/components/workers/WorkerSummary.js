import React from "react";

const WorkerSummary = ({ worker }) => {
  return (
    <div className="card horizontal">
      <div className="card-image">
        <img src={worker.imageUrl} alt="text" width="100dpx" height="200dpx" />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <span class="title">Name : {worker.name}</span>
          <br />
          <span class="title">Gender : {worker.gender}</span>
          <br />
          <span class="title">Worker Type : {worker.workerType}</span>
          <br />
          <span class="title">Documents : {worker.documents} </span>
        </div>
        <div class="card-action">
          <a href="/worker/:{worker.id}">Hire | Book</a>
        </div>
      </div>
    </div>
  );
};

export default WorkerSummary;
