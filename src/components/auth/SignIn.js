import React, { Component } from "react";

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
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label type="number">Mobile No</label>
            <input type="number" id="phone" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="otp">OTP</label>
            <input type="number" id="otp" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
