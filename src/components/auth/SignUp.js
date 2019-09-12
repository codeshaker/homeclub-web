import React, { Component } from "react";
import { signUp } from "../../store/actions/authActions";
import { trySignUp } from "../../store/actions/authActions";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SignUp extends Component {
  state = {
    name: this.props.name,
    phone: this.props.phone,
    email: this.props.email,
    address: this.props.address
  };

  componentDidMount() {
    this.props.trySignUp();
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
      <div class="container">
        <div class="row">
          <form onSubmit={this.handleSubmit}>
            <div class="row">
              <div class="col s12 m6 offset-m3">
                <div class="card mg">
                  <div class="card-content">
                    <span class="card-title center-align indigo-text text-darken-5">
                      SIGN UP
                    </span>
                    <br />

                    <div class="form-field">
                      <label for="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        class="validate"
                        value={this.props.name ? this.props.name : null}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div class="form-field">
                      <label for="icon_telephone">Mobile Number</label>
                      <input
                        type="tel"
                        id="phone"
                        class="validate"
                        value={this.props.phone ? this.props.phone : null}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div class="form-field">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        class="validate"
                        value={this.props.email ? this.props.email : null}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div class="form-field">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        class="validate"
                        value={this.props.address ? this.props.address : null}
                        onChange={this.handleChange}
                      />
                    </div>
                    <center>
                      <button
                        id="loginButtonId"
                        onClick={
                          this.state.isOTPSent ? this.handleSubmit : null
                        }
                        class="btn btn-large waves-effect indigo center-align"
                      >
                        Submit
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
  console.log(state);
  return {
    name: state.user.name,
    phone: state.user.phone,
    email: state.user.email,
    address: state.user.address
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
