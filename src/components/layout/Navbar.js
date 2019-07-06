import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SearchLink from "./SearchLink";

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          HomeClub
        </Link>
        <SignedInLinks />
        <SignedOutLinks />
        <SearchLink />
      </div>
    </nav>
  );
};

export default Navbar;
