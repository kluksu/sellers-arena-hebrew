import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class FullPageLoader extends Component {
  render() {
    console.log(this.props.LoaderVisibilty);

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
