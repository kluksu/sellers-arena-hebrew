import Loader from "react-loader-spinner";
import React, { Component } from "react";

export default class MyLoader extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type={this.props.type}
        color={this.props.color}
        height={this.props.height}
        width={this.props.width}
        timeout={this.props.timeout} //3 secs
      />
    );
  }
}
