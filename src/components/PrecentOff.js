import React, { Component } from "react";

export default class PrecentOff extends Component {
  render() {
    let precent = this.props.precent.substring(
      0,
      this.props.precent.length - 1
    );

    precent = Math.round(precent);

    return <div className="precentOff">{precent}%-</div>;
  }
}
