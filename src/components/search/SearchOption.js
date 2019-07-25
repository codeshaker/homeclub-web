import React from "react";

const SearchOption = ({ option }) => {
  return <option value={option.id}>{option.id}</option>;
};

export default SearchOption;
