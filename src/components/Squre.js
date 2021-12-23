import React, { Component } from "react";

export default class Squre extends Component {
  render() {
    return (
      <div
        className="squre"
        style={{
          height: this.props.height,
          width: this.props.width,
          background: this.props.background,
          margin: "0px 10px 0px 10px",
        }}
      ></div>
    );
  }
}
