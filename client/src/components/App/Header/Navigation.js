import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="nav_container">
        <div className="nav_div">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/numberGame">Number Game</NavLink>
            </li>
            <li>
              <NavLink to="/shapeGame">Shape Game</NavLink>
            </li>
            <li>
              <NavLink to="/user">User</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
