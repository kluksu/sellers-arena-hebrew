import React, { Component } from "react";

export default class HorizontalScrollBox extends Component {
  render() {
    return (
      <div className="HorizontalScrollBoxContainer"> {this.props.content}</div>
    );
  }
}
