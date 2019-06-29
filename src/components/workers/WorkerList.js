import React from "react";
import WorkerSummary from "./WorkerSummary";

const WorkerList = () => {
  return (
    <ul class="collection">
      <WorkerSummary />
      <WorkerSummary />
      <WorkerSummary />
    </ul>
  );
};

export default WorkerList;
