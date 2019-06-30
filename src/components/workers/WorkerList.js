import React from "react";
import WorkerSummary from "./WorkerSummary";

const WorkerList = ({ workers }) => {
  return (
    <div class="col s12 m7">
      <h2 class="header">Worker List</h2>
      {workers &&
        workers.map(worker => {
          return <WorkerSummary worker={worker} key={worker.id} />;
        })}
    </div>
  );
};

export default WorkerList;
