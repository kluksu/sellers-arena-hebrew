import React, { Component } from "react";

export default class TutorialsVideo extends Component {
  render() {
    return (
      <div className="tutorialsVideo">
        <h1>{this.props.headLine}</h1>
        {this.props.video}
      </div>
    );
  }
}
