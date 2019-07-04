import React from "react";
import { NavLink } from "react-router-dom";

const SearchLink = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/searchworker">Search</NavLink>;
      </li>
    </ul>
  );
};

export default SearchLink;
