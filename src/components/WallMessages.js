import React, { Component } from "react";

export default class WallMessages extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.userInfo.name}</h4>
        <p>{this.props.userInfo.messages}</p>
      </div>
    );
  }
}
