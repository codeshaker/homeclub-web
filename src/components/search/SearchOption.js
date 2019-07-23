import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SearchOption = ({ option }) => {
  const { auth } = this.props;
  if (!auth.uid) return <Redirect to="/signIn" />;

  return <option value={option.id}>{option.id}</option>;
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SearchOption);
