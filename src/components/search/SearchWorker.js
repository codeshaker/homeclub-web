import React, { Component } from "react";
import M from "materialize-css";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import $ from "jquery";
import { searchWorker } from "../../store/actions/workerActions";
import SearchOption from "./SearchOption";

// Imagine you have a list of languages that you'd like to autosuggest.
const areaNames = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : areaNames.filter(
        areaName =>
          areaName.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

// Class component
class SearchWorker extends Component {
  constructor() {
    super();
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.

    this.state = {
      value: "",
      suggestions: [],
      selectedWorkerType: "",
      selectedGender: "",
      selectedCity: ""
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleWorkerTypeSelectChange = e => {
    const optionSelected = $("select#workerTypeSelect").val();
    this.setState({
      selectedWorkerType: optionSelected
    });
  };

  handleGenderSelectChange = e => {
    const optionSelected = $("select#genderSelect").val();
    this.setState({
      selectedGender: optionSelected
    });
  };

  handleCitySelectChange = e => {
    const optionSelected = $("select#citySelect").val();
    this.setState({
      selectedCity: optionSelected
    });

    // Empty the areaNames json array.
    while (areaNames.length > 0) {
      areaNames.pop();
    }

    // Once user select city , locationNames should populate values of it.
    const { cities } = this.props;

    if (cities && cities.length > 1) {
      cities.forEach(city => {
        if (city["id"] === optionSelected) {
          const areas = city.areas;
          if (areas && areas.length > 1) {
            areas.forEach(area => {
              const obj = {};
              obj["name"] = area;
              areaNames.push(obj);
            });
          }
        }
      });
    }
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    // Check if state has all relevant values
    if (
      this.state.value !== "" &&
      this.state.selectedCity !== "" &&
      this.state.selectedWorkerType !== ""
    ) {
      // dispatch a action for fetching worker list
      console.log("dispatch action");
      console.log("in handle submit passed", this.state);
      this.props.searchWorker(this.state).then(() => {
        this.props.history.push("/workerlist");
      });
    } else {
      // show alert
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Populate the cities and workerType from firestore
    const { cities } = this.props;
    const { workerType } = this.props;
    const { genders } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Enter Area Name",
      value,
      onChange: this.onChange
    };

    //<SearchType options={workerType} label="Enter WorkerType" />
    return (
      <div className="container center">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Search Worker</h5>

          <div className="input-field col s12">
            <select
              id="workerTypeSelect"
              class="browser-default"
              onChange={this.handleWorkerTypeSelectChange}
            >
              <option value="" disabled selected>
                Select Worker Type
              </option>
              {workerType &&
                workerType.map(type => {
                  return <SearchOption option={type} />;
                })}
            </select>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="input-field col s12">
            <select
              id="genderSelect"
              class="browser-default"
              onChange={this.handleGenderSelectChange}
            >
              <option value="" disabled selected>
                Select Gender
              </option>
              {genders &&
                genders.map(gender => {
                  return <SearchOption option={gender} />;
                })}
            </select>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="input-field col s12">
            <select
              id="citySelect"
              class="browser-default"
              onChange={this.handleCitySelectChange}
            >
              <option value="" disabled selected>
                Select City
              </option>
              {cities &&
                cities.map(city => {
                  return <SearchOption option={city} />;
                })}
            </select>
          </div>

          <br />
          <br />
          <br />
          <br />

          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.firestore.ordered.cities,
    workerType: state.firestore.ordered.workerType,
    genders: state.firestore.ordered.genders
  };
};

const mapDispatchToProps = dispatch => {
  console.log("in mapDispatchToProps");
  return {
    searchWorker: async searchDetails => dispatch(searchWorker(searchDetails))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "cities" }]),
  firestoreConnect([{ collection: "workerType" }]),
  firestoreConnect([{ collection: "genders" }])
)(SearchWorker);
