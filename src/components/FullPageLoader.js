import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class FullPageLoader extends Component {
  render() {
    return (
      <div
        className="fullPageLoader"
        style={{ display: this.props.LoaderVisibilty }}
      >
        <Loader type={"Rings"} height={400} width={400} color="blue" />
      </div>
    );
  }
}
