import React, { Component } from "react";

export default class DetailsOnOrderSeller extends Component {
  render() {
    let headlineSize = this.props.screenWidth > 650 ? "60px" : "20px";

    return (
      <div>
        <h1>
          {/* {this.props.activeCartStatus} */}
          {this.props.activeCartStatus === "filled"
            ? "נשלחה"
            : null || this.props.activeCartStatus === "seller_approved"
            ? "מחכה למשלוח"
            : null || this.props.activeCartStatus === "submitted"
            ? " מחכה לאישור"
            : null}
        </h1>
        <div className="sellerInfoContainer">
          <span style={{ fontSize: headlineSize }}>
            {" "}
            {this.props.activeAccount.name}
          </span>
          <div>
            {" "}
            <div> מספר הזמנה {this.props.orderID}</div>
            <span>
              {this.props.activeAccount.store_address}{" "}
              {this.props.activeAccount.phone_number}{" "}
            </span>
            <span>
              {" "}
              {`   תאריך :${this.props.activeOrder.submitted_at
                .replace("T", " ")
                .slice(0, 19)}    `}{" "}
            </span>
          </div>
          <div> {`  ח"פ: ${this.props.activeAccount.tax_id}`}</div>
        </div>
      </div>
    );
  }
}
