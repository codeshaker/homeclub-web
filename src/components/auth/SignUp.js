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
            <label type="text">Name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="tel">Mobile No</label>
            <input
              type="tel"
              id="phone"
              class="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              class="validate"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="text">Address</label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="text">Gender</label>
            <input type="text" id="gender" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <input
              type="date"
              id="dateOfBirth"
              class="validate"
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

export default SignUp;
