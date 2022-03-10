import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <div className="siteBottom">
        <div>{this.props.name}</div>
        <div>{this.props.address}</div>
        {/* <div>{this.props.email}</div> */}
        <div>{this.props.phone}</div>
        <div>{this.props.termsLink}</div>
        <div>{this.props.privacyLink}</div>
        {/* <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div> */}
      </div>
    );
  }
}
