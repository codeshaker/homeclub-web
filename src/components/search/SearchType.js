import React from "react";
import SearchOption from "./SearchOption";

const SearchType = ({ cities }) => {
  console.log("in search type");
  console.log(cities);
  return (
    <select class="browser-default">
      <option value="" disabled selected>
        Enter City
      </option>
      {cities &&
        cities.map(city => {
          return <SearchOption city={city} />;
        })}
    </select>
  );
};

export default SearchType;
