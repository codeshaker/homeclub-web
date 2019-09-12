import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { trySignUp } from "../../store/actions/authActions";
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

  componentWillUnmount() {
    this.props.trySignUp();
  }

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
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div class="container">
        <div class="row">
          <form onSubmit={this.handleSubmit}>
            <div class="row">
              <div class="col s12 m6 offset-m3">
                <div class="card mg">
                  <div class="card-content">
                    <span class="card-title center-align indigo-text text-darken-5">
                      LOGIN
                    </span>
                    {!this.state.isOTPSent && (
                      <div class="form-field">
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
                      <div class="form-field">
                        <label for="otp">OTP</label>
                        <input
                          type="text"
                          id="otp"
                          onChange={this.handleChange}
                        />
                      </div>
                    )}
                    <center>
                      <button
                        id="loginButtonId"
                        onClick={
                          this.state.isOTPSent ? this.handleSubmit : null
                        }
                        class="btn btn-large waves-effect indigo"
                      >
                        {this.state.isOTPSent ? "Login" : "Get OTP"}
                      </button>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
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
    signIn: phoneNumber => dispatch(signIn(phoneNumber)),
    trySignUp: () => dispatch(trySignUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
