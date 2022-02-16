import React, { Component } from "react";

export default class PrecentOff extends Component {
  render() {
    console.log(this.props.precent);
    let precent = this.props.precent.substring(
      0,
      this.props.precent.length - 1
    );
    console.log(precent);
    precent = Math.round(precent);
    console.log(precent);

    return <div className="precentOff">{precent}%-</div>;
  }
}
