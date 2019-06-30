import React from "react";

const WorkerSummary = ({ worker }) => {
  return (
    <div className="card horizontal">
      <div className="card-image">
        <img src={worker.imagePath} />
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
          <a href="#">Hire | Book</a>
        </div>
      </div>
    </div>

    /*<div className="card horizontal">
      <div className="card-image">
        <img src="https://lorempixel.com/100/190/nature/6" />
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <span class="title">Name : Kanta bai</span>
          <br />
          <span class="title">Gender : Female</span>
          <br />
          <span class="title">Cook|Maid</span>
          <br />
          <span class="title">Aadhar Verified</span>
          <input type="checkbox" checked="checked" />
          <span class="title">Police Verified</span>
          <input type="checkbox" checked="checked" />
        </div>
        <div class="card-action">
          <a href="#">Hire | Book</a>
        </div>
      </div>
    </div>*/
  );
};

export default WorkerSummary;
