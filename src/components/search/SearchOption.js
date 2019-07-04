import React from "react";

const SearchOption = ({ city }) => {
  console.log("in search option ");
  console.log("{city.id}");
  return <option value={city.id}>{city.id}</option>;
};

export default SearchOption;
