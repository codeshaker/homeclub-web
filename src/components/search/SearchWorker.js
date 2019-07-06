import React, { Component } from "react";
import M from "materialize-css";
import Autosuggest from "react-autosuggest";
import SearchType from "./SearchType";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// Imagine you have a list of languages that you'd like to autosuggest.
const areaNames = [
  {
    name: "masjid banda"
  },
  {
    name: "mandinaguda"
  },
  {
    name: "kondapur"
  },
  {
    name: "gachibwli"
  },
  {
    name: "chirec"
  },
  {
    name: "miyapur"
  }
];

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
      suggestions: []
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
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

    const { cities } = this.props;
    const { workerType } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Enter Area Name",
      value,
      onChange: this.onChange
    };

    return (
      <div className="container center">
        <SearchType options={workerType} label="Enter WorkerType" />

        <br />
        <br />
        <br />
        <br />

        <SearchType options={cities} label="Enter City" />

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
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    cities: state.firestore.ordered.cities,
    workerType: state.firestore.ordered.workerType
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "cities" }]),
  firestoreConnect([{ collection: "workerType" }])
)(SearchWorker);
