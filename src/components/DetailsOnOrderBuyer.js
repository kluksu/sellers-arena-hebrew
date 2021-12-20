import React, { Component } from "react";

export default class DetailsOnOrderBuyer extends Component {
  render() {
    let headlineSize = this.props.screenWidth > 650 ? "60px" : "20px";

    return (
      <div className="sellerInfoContainer">
        <span style={{ fontSize: headlineSize }}> {this.props.buyer.name}</span>
        <div>
          {" "}
          <span>
            {this.props.buyer.store_address} {this.props.buyer.phone_number}{" "}
          </span>
        </div>

        <div> {`ח"פ:${this.props.buyer.tax_id}  `}</div>
      </div>
    );
  }
}
