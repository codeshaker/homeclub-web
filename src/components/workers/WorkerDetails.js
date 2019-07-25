import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";

class WorkerDetails extends Component {
  state = {
    timeslots: [],
    package: "",
    startDate: "",
    numberPeople: 0
  };

  handleSubmit() {
    if (
      this.state.package === "" ||
      this.state.numberPeople === "" ||
      this.state.startDate === "" ||
      this.state.timeslots.length <= 1
    ) {
      console.log("some of the value did not got filled");
      return null;
    }

    // Dispatch action of creating a new booking document.
  }

  computeCost() {
    console.log("inside compute cost");
    const pack = {
      "1": 800,
      "2": 1000,
      "3": 1000,
      "4": 1300,
      "5": 1500,
      "6": 1300,
      "7": 2000
    };

    if (this.state.package === "" || this.state.numberPeople === "") return 0;

    return pack[this.state.package] * this.state.numberPeople;
  }

  componentDidMount() {
    M.AutoInit();
  }
  handleMultipleSelectChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        console.log(options[i].value);
      }
    }
    this.setState({
      [e.target.id]: value
    });
    console.log(this.state);

    // calling the compute cost
    this.computeCost();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state);
    // calling the compute cost
    this.computeCost();
  };

  render() {
    const { worker, auth } = this.props;

    if (!auth.uid) return <Redirect to="/signIn" />;

    const timeSlots = "100011000010001110001110";

    const packmapping = {
      "1": "breakfast (1 time)",
      "2": "lunch (1 time)",
      "3": "dinner(1 time)",
      "4": "breakfast + lunch (1 time)",
      "5": "lunch + dinner (2 times)",
      "6": "breakfast + dinner (2 times)",
      "7": "breakfast + lunch + dinner (2 times)"
    };

    let index = 0;

    if (true) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <div className="card-image">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/homeclub-69cc7.appspot.com/o/workerImages%2Falastair-cook.jpg?alt=media&token=a07e5dc9-cdba-4887-a0f9-1cd4c9d0f3b2"
                  alt="text"
                  width="100dpx"
                  height="200dpx"
                />
              </div>
            </div>
            <div className="col s12 m5 offset-m1">
              <div>
                <span class="title">Name : Nitesh Kumar</span>
                <br />
                <span class="title">Gender : Male</span>
                <br />
                <span class="title">WorkerType : Cook</span>
                <br />
              </div>
            </div>
          </div>

          <div className="input-field col s12">
            <select
              multiple
              id="timeslots"
              onChange={this.handleMultipleSelectChange}
            >
              <option value="" disabled selected>
                Select Available TimeSlots
              </option>

              {timeSlots &&
                timeSlots.split("").map(interval => {
                  index++;

                  //available time slot is deonted by 1
                  if (interval === "1") {
                    return (
                      <option value={index - 1}>
                        {index - 1} - {index}
                      </option>
                    );
                  } else return null;
                })}
            </select>
            <label>TimeSlots</label>
          </div>

          <div className="input-field col s12">
            <select id="package" onChange={this.handleChange}>
              <option value="" disabled selected>
                Select Package
              </option>
              {packmapping &&
                Object.keys(packmapping).map((key, index) => {
                  return <option value={key}>{packmapping[key]}</option>;
                })}
            </select>
            <label>Package</label>
          </div>

          <div className="input-field">
            <label htmlFor="numberPeople">Enter Number Of People</label>
            <input
              type="number"
              id="numberPeople"
              onChange={this.handleChange}
            />
          </div>

          <br />
          <br />

          <div className="input-field">
            <input
              type="date"
              id="startDate"
              class="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field col s6">
            <label>Total Monthly Cost</label>
            <input
              value={this.computeCost()}
              id="cost"
              type="number"
              class="validate"
            />
          </div>

          <br />
          <br />
          <button
            onClick={this.handleSubmit()}
            className="btn pink lighten-1 z-depth-0"
          >
            Book
          </button>
          <br />
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading Worker Details...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const workers = state.workers.workers;
  // Reducing the id with one as starting index is from 0
  const worker = workers ? workers[id - 1] : null;
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
