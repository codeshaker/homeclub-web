import React, { Component } from "react";

class CreateWorker extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    gender: "",
    workerType: "",
    isAadharVerified: "",
    isPoliceVerified: "",
    speciality: "",
    language: "",
    package: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Worker</h5>

          <div className="input-field">
            <label type="string">Name</label>
            <input type="string" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="number">Mobile No</label>
            <input type="number" id="phone" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="string">Address</label>
            <input type="string" id="address" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="string">Gender</label>
            <input type="string" id="gender" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="string">Worker Type</label>
            <input type="string" id="workerType" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="string">Aadhar Verified</label>
            <input
              type="string"
              id="isAadharVerified"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label type="string">Police Verified</label>
            <input
              type="string"
              id="isPoliceVerified"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label type="string">Speciality</label>
            <input type="string" id="speciality" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="string">Language</label>
            <input type="string" id="language" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="string">Package</label>
            <input type="string" id="package" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Create Worker
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateWorker;
