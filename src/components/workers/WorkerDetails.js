import React from "react";

const WorkerDetails = props => {
  const id = props.match.params.id;
  return (
    <div className="container">
      <span class="title">Name : Kanta bai : {id}</span>
      <br />
      <span class="title">Gender : Female</span>
      <br />
      <span class="title">Cook|Maid</span>
      <br />
      <span class="title">Aadhar Verified \/</span>
      <span class="title">Police Verified \/</span>

      <span class="title">Speciality : Veg , Non- Veg</span>
      <br />
      <span class="title">Language : Hindi , Telugu</span>
      <br />
      <span class="title">Package</span>
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
};

export default WorkerDetails;
