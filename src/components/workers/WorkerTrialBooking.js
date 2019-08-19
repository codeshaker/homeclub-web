import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import { confirmTrialBooking } from "../../store/actions/bookingActions";

class WorkerTrialBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: [],
      trialDate: "",
      workerId: "",
      userId: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log("inside handle submit", this.state);

    if (this.state.trialDate === "" || this.state.timeslots.length < 1) {
      console.log("some of the value did not got filled");
      return null;
    }

    // Dispatch action of creating a new booking document.
    this.props.confirmTrialBooking(this.state);
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

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { auth, worker } = this.props;

    if (!auth.uid) return <Redirect to="/signIn" />;

    const timeSlots = worker ? worker.timeSlot : null;

    let index = 0;

    // Render when we are getting proper workerType
    if (worker) {
      return (
        <div>
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

          <div className="input-field">
            <input
              type="date"
              id="trialDate"
              class="validate"
              onChange={this.handleChange}
            />
          </div>
          <button
            onClick={this.handleSubmit}
            className="btn pink lighten-1 z-depth-0"
          >
            Trial Book
          </button>
          <br />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    confirmTrialBooking: bookingDetails =>
      dispatch(confirmTrialBooking(bookingDetails))
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(WorkerTrialBooking);
