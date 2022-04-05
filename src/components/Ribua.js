import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { shake } from "./utils";

export default class Ribua extends Component {
  render() {
    return (
      // <Col xl={12} lg={12} md={12} sm={12} xs={12}>
      <div
        className={` ribua changableBackground  ${
          this.props.selectedElement === "priceBox" ? shake : ""
        }`}
        onClick={(e) => this.props.selectElement(e, "priceBox")}
        // style={{ width: "100%", minWidth: "320px" }}
      >
        {this.props.text}
      </div>
      // </Col>
    );
  }
}
