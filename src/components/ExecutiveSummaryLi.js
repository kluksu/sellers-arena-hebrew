import React, { Component } from "react";

export default class ExecutiveSummaryLi extends Component {
  render() {
    return (
      <li>
        <h1>{this.props.headLine}</h1>
        <p>{this.props.text}</p>
      </li>
    );
  }
}
