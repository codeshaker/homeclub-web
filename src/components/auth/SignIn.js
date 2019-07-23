import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    phone: "",
    otp: "",
    isOTPSent: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.isOTPSent) {
      this.props.signIn(this.state.phone);
    } else {
      window.confirmationResult
        .confirm(this.state.otp)
        .then(console.log("login done"));
    }
    //console.log(this.state.isOTPSent);
    this.setState({ isOTPSent: !this.state.isOTPSent });
    //console.log(this.state.isOTPSent);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          {!this.state.isOTPSent && (
            <div className="input-field">
              <label for="icon_telephone">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                class="validate"
                onChange={this.handleChange}
              />
            </div>
          )}

          {this.state.isOTPSent && (
            <div className="input-field">
              <label htmlFor="otp">OTP</label>
              <input type="text" id="otp" onChange={this.handleChange} />
            </div>
          )}

          <div className="input-field">
            <button
              id="loginButtonId"
              onClick={this.state.isOTPSent ? this.handleSubmit : null}
              className="btn pink lighten-1 z-depth-0"
            >
              {this.state.isOTPSent ? "Login" : "Get OTP"}
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
    authError: state.auth.authError,
    auth: state.firebase.auth
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
