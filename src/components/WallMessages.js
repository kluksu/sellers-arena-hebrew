import React, { Component } from "react";

export default class WallMessages extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.userInfo.name}</h1>
        <p>{this.props.userInfo.messages}</p>
      </div>
    );
  }
}
