import React from "react";
import WorkerSummary from "./WorkerSummary";
import { Link } from "react-router-dom";

const WorkerList = ({ workers }) => {
  return (
    <div className="col s12 m7">
      <h2 className="header">Worker List</h2>
      {workers &&
        workers.map(worker => {
          return (
            <Link to={"/worker/" + worker.id} key={worker.id}>
              <WorkerSummary worker={worker} />;
            </Link>
          );
        })}
    </div>
  );
};

export default WorkerList;
