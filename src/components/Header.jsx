import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#FFBABA" }}
      >
        <Link className="navbar-brand" to="/">
          BusTracker Application
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/map">
                Simulation (Map)
              </Link>
            </li>
          </ul> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
