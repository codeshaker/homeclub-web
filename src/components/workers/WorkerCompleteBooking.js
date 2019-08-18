import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import { confirmBooking } from "../../store/actions/bookingActions";

class WorkerCompleteBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: [],
      package: "",
      startDate: "",
      numberOfPeople: 0,
      monthlyCost: 0,
      workerId: "",
      userId: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log("inside handle submit", this.state);
    if (
      this.state.monthlyCost === 0 ||
      this.state.startDate === "" ||
      this.state.timeslots.length < 1
    ) {
      console.log("some of the value did not got filled");
      return null;
    }

    this.props.confirmBooking(this.state);

    // Dispatch action of creating a new booking document.
  };

  computeCost = e => {
    const { worker } = this.props;
    const pack = worker ? worker.package : null;
    const workerType = worker ? worker.workerType : null;
    let computedCost = 0;

    if (pack == null || workerType == null) return computedCost;

    if (workerType === "cook") {
      if (this.state.package !== "" || this.state.numberOfPeople !== "")
        computedCost = pack[this.state.package] * this.state.numberOfPeople;
    } else {
      if (this.state.package !== "") computedCost = pack[this.state.package];
    }

    return computedCost;
  };

  componentDidMount() {
    M.AutoInit();
    console.log("in component did mount");

    const { worker, auth } = this.props;

    // Setting the workerId in local state property
    if (worker) {
      this.setState({
        workerId: worker.id
      });
    }

    // Setting the userId in local state property
    this.setState({
      userId: auth.uid
    });
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

    // Setting the computed cost in local state property.
    this.setState({
      monthlyCost: this.computeCost()
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

    // Setting the computed cost in local state property.
    this.setState({
      monthlyCost: this.computeCost()
    });
  };

  cookFullDetails = props => {};

  render() {
    const { auth, worker } = this.props;

    if (!auth.uid) return <Redirect to="/signIn" />;

    const timeSlots = worker ? worker.timeSlot : null;
    const workerType = worker ? worker.workerType : null;

    // cook package mapping
    const cookPackageMapping = {
      "1": "breakfast (1 time)",
      "2": "lunch (1 time)",
      "3": "dinner(1 time)",
      "4": "breakfast + lunch (1 time)",
      "5": "lunch + dinner (2 times)",
      "6": "breakfast + dinner (2 times)",
      "7": "breakfast + lunch + dinner (2 times)"
    };

    // maid package mapping
    const maidPackageMapping = {
      "1": "1 BHK",
      "2": "2 BHK",
      "3": "3 BHK",
      "4": "4 BHK"
    };

    // choosing the package based on worker type
    const packageMapping =
      workerType === "cook" ? cookPackageMapping : maidPackageMapping;

    let index = 0;

    // Render when we are getting proper workerType
    if (worker) {
      return (
        <div>
          {workerType === "cook" ? (
            <div className="input-field col s12">
              <select
                multiple
                id="timeslots"
                onChange={this.handleMultipleSelectChange}
              >
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
          ) : (
            <div className="input-field col s12">
              <select id="timeslots" onChange={this.handleChange}>
                <option value="" disabled selected>
                  Select One TimeSlots
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
          )}
          <div className="input-field col s12">
            <select id="package" onChange={this.handleChange}>
              <option value="" disabled selected>
                Select Package
              </option>
              {packageMapping &&
                Object.keys(packageMapping).map((key, index) => {
                  return <option value={key}>{packageMapping[key]}</option>;
                })}
            </select>
            <label>Package</label>
          </div>

          {workerType === "cook" ? (
            <div className="input-field">
              <label htmlFor="numberPeople">Enter Number Of People</label>
              <input
                type="number"
                id="numberOfPeople"
                onChange={this.handleChange}
              />
            </div>
          ) : null}
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
              id="monthlyCost"
              type="number"
              class="validate"
            />
          </div>
          <br />
          <br />
          <button
            onClick={this.handleSubmit}
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
          <p>Error Loading Worker Details...</p>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirmBooking: bookingDetails => dispatch(confirmBooking(bookingDetails))
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(WorkerCompleteBooking);
