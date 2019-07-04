import React from "react";
import SearchOption from "./SearchOption";

const SearchType = props => {
  const { options } = props;
  const label = props.label;
  return (
    <select class="browser-default">
      <option value="" disabled selected>
        {label}
      </option>
      {options &&
        options.map(option => {
          return <SearchOption option={option} />;
        })}
    </select>
  );
};

export default SearchType;
