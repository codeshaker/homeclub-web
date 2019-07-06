import React, { Component } from "react";
import { connect } from "react-redux";
import { createWorker } from "../../store/actions/workerActions";

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
    //console.log(this.state);
    this.props.createWorker(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Worker</h5>

          <div className="input-field">
            <label type="text">Name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="number">Mobile No</label>
            <input type="tel" id="phone" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="text">Address</label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="text">Gender</label>
            <input type="text" id="gender" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="text">Worker Type</label>
            <input type="text" id="workerType" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="text">Aadhar Verified</label>
            <input
              type="text"
              id="isAadharVerified"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label type="text">Police Verified</label>
            <input
              type="text"
              id="isPoliceVerified"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label type="text">Speciality</label>
            <input type="text" id="speciality" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="text">Language</label>
            <input type="text" id="language" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label type="text">Package</label>
            <input type="text" id="package" onChange={this.handleChange} />
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

const mapStateToDispatch = dispatch => {
  return {
    createWorker: worker => {
      dispatch(createWorker(worker));
    }
  };
};

export default connect(
  null,
  mapStateToDispatch
)(CreateWorker);
