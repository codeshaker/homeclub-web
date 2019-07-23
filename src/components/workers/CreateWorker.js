import React, { Component } from "react";
import { connect } from "react-redux";
import { createWorker } from "../../store/actions/workerActions";
import M from "materialize-css";
import { storage } from "../../config/fbConfig";
import { Redirect } from "react-router-dom";

class CreateWorker extends Component {
  state = {
    name: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
    experience: "",
    imageUrl: "",
    workerType: "",
    documents: [],
    city: "",
    areas: [],
    speciality: [],
    language: [],
    package: "",
    timeSlot: "",
    url: "",
    image: ""
  };

  localFile = {
    image: ""
  };

  componentDidMount() {
    M.AutoInit();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state);
  };

  handleMultipleSelectChange = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      [e.target.id]: value
    });
    console.log(this.state);
  };

  hanglePhotoSelect = e => {
    if (e.target.files[0]) {
      //const imageFile = e.target.files[0];
      //this.localFile["image"] = imageFile;
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
    console.log("in photo upload", this.state);
  };

  handleSubmit = e => {
    console.log("in handle submit ");

    /*
    // handle photo upload
    const { image } = this.state;
    console.log("in handle submit ", image.name);
    var uploadTask = storage.ref(`workerImages/${image.name}`).put(image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function
        //var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("Upload is " + progress + "% done");
      },
      error => {
        //console.log(error);
      },
      () => {
        // function complete.
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          console.log(url);
          this.setState({ url });
          /*this.setState({
              image: ""
            });
          })
          .then(() => {
            e.preventDefault();
            // Dispatch action
            this.props.createWorker(this.state);
          })
          .catch(err => {});
      }
    );*/

    e.preventDefault();
    // Dispatch action
    this.props.createWorker(this.state);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signIn" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Worker</h5>

          <div className="input-field">
            <label type="text">Name</label>
            <input type="text" id="name" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label type="number">Phone</label>
            <input type="tel" id="phone" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="text">Address</label>
            <input type="text" id="address" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="text">Age</label>
            <input type="text" id="age" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="text">Experience</label>
            <input type="text" id="experience" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="text">TimeSlot</label>
            <input type="text" id="timeSlot" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <select multiple id="city" onChange={this.handleChange}>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
            </select>
            <label>City</label>
          </div>

          <div className="input-field">
            <select
              multiple
              id="areas"
              onChange={this.handleMultipleSelectChange}
            >
              <option value="masjidbanda">masjid banda</option>
              <option value="chirec">chirec</option>
              <option value="whitefield">whitefield</option>
              <option value="masjidbanda">shilpa park</option>
              <option value="chirec">kothaguda</option>
              <option value="whitefield">indiranagar</option>
              <option value="masjidbanda">raghvendra colony</option>
            </select>
            <label>Areas</label>
          </div>

          <div className="input-field">
            <select multiple id="gender" onChange={this.handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Gender</label>
          </div>

          <div className="input-field" onChange={this.handleChange}>
            <select multiple id="workerType" onChange={this.handleChange}>
              <option value="Cook">Cook</option>
              <option value="Maid">Maid</option>
            </select>
            <label>Worker Type</label>
          </div>

          <div className="input-field">
            <select
              multiple
              id="documents"
              onChange={this.handleMultipleSelectChange}
            >
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Police Verified">Police Verified</option>
              <option value="HC Form">HC Form</option>
              <option value="Election Card">Election Card</option>
            </select>
            <label>Documents</label>
          </div>

          <div className="input-field">
            <select
              multiple
              id="speciality"
              onChange={this.handleMultipleSelectChange}
            >
              <option value="North Indian">North Indian</option>
              <option value="South Indian">South Indian</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <label>Speciality</label>
          </div>

          <div className="input-field">
            <select
              multiple
              id="language"
              onChange={this.handleMultipleSelectChange}
            >
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
              <option value="Oriya">Oriya</option>
            </select>
            <label>Language</label>
          </div>

          <div className="input-field">
            <label type="text">Package</label>
            <input type="text" id="package" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <input type="file" onChange={this.hanglePhotoSelect} />
            <br />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Create Worker
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapStateToDispatch = dispatch => {
  return {
    createWorker: worker => {
      dispatch(createWorker(worker));
    }
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(CreateWorker);
