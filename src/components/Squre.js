import React, { Component } from "react";

export default class Squre extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className={`squre ` + this.props.className}
        style={{
          height: this.props.height,
          width: this.props.width,
          background: this.props.background,
          margin: this.props.margin,
          color: this.props.color,
        }}
      >
        {this.props.img}

        <h1>{this.props.headLine}</h1>

        <p>{this.props.text}</p>
      </div>
    );
  }
}
