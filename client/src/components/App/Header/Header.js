import React, { Component } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Title from "./Title";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Title />
        <Navigation />
        <Login />
      </div>
    );
  }
}
