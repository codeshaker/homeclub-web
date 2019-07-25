import React, { Component } from "react";
import { signUp } from "../../store/actions/authActions";
import { trySignUp } from "../../store/actions/authActions";
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    name: this.props.name,
    phone: this.props.phone,
    email: this.props.email,
    address: this.props.address,
    gender: this.props.gender,
    dateOfBirth: this.props.dateOfBirth
  };

  componentDidMount() {
    this.props.trySignUp();
    // this.setState({
    //   name: this.props.name,
    //   phone: this.props.phone,
    //   email: this.props.email,
    //   gender: this.props.gender,
    //   address: this.props.address,
    //   dateOfBirth: this.props.dateOfBirth
    // });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign up</h5>

          <div className="input-field">
            <label type="text">Name</label>
            <input
              type="text"
              id="name"
              defaultValue={this.props.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label type="tel">Mobile No</label>
            <input
              type="tel"
              id="phone"
              class="validate"
              defaultValue={this.props.phone}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              class="validate"
              defaultValue={this.props.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="text">Address</label>
            <input
              type="text"
              id="address"
              defaultValue={this.props.address}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label type="text">Gender</label>
            <input
              type="text"
              id="gender"
              defaultValue={this.props.gender}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <input
              type="date"
              id="dateOfBirth"
              class="validate"
              defaultValue={this.props.dateOfBirth}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
    gender: state.user.gender,
    address: state.user.address,
    dateOfBirth: state.user.dateOfBirth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser)),
    trySignUp: () => dispatch(trySignUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
