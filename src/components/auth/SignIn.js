import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

class SignIn extends Component {
  state = {
    phone: "",
    otp: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state.phone);
  };

  render() {
    const { authError } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label for="icon_telephone">Mobile Number</label>
            <input
              type="tel"
              id="phone"
              class="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="otp">OTP</label>
            <input type="text" id="otp" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button id="loginButtonId" className="btn pink lighten-1 z-depth-0">
              Login
            </button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: phoneNumber => dispatch(signIn(phoneNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
