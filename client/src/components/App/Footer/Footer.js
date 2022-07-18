import React, { Component } from "react";
import AccessibilityWidget from "./Widget/AccessibilityWidget";

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <AccessibilityWidget />
        <p>Email: UP864756@myport.ac.uk</p>
        <p>Tel: +44 7388 057879</p>
      </div>
    );
  }
}
