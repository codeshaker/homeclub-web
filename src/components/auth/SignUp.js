import React, { Component } from "react";

class SignUp extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dateOfBirth: ""
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
          <h5 className="grey-text text-darken-3">Sign up</h5>

          <div className="input-field">
            <label type="string">Name</label>
            <input type="string" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="number">Mobile No</label>
            <input type="number" id="phone" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="string">Address</label>
            <input type="string" id="address" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="string">Gender</label>
            <input type="string" id="gender" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="date">DOB</label>
            <input type="date" id="dateOfBirth" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
