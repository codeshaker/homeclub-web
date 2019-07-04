import React from "react";

const SearchOption = ({ option }) => {
  return <option value={option}>{option.id}</option>;
};

export default SearchOption;
