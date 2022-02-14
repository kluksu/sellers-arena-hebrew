import React, { Component } from "react";

export default class extends Component {
  render() {
    let onlyNumbers = new RegExp("^[0-9]*$");
    let discountsArr = [];
    let prev = 0;
    let price = 0;
    let lastItems = 0;
    let lastPrice = 0;
    let discountClass = "productCardDiscounts";

    if (this.props.variation) {
      let discounts = this.props.variation.discounts;
      discounts["0"] = 0;
      if (Object.keys(discounts).length > 1) {
        for (const [Items, value] of Object.entries(discounts)) {
          discountClass = "productCardDiscounts";
          if (Items == 0) {
            price = this.props.price * (1 - value).toFixed(2);
            continue;
          }
          discountsArr.push(
            <span
              className="discountBox"
              // className="borderRight"
            >
              <div>
                {parseInt(prev) + 1}-{Items} יחידות{" "}
              </div>{" "}
              <div>{price.toFixed(2)}₪ ליחידה </div>{" "}
            </span>
          );
          price = this.props.price * (1 - value);
          lastItems = Items;
          lastPrice = price;
          if (parseInt(Items) > parseInt(prev)) {
            prev = Items;
          }
        }

        discountsArr.push(
          <span className="discountBox">
            <div>{`>=${parseInt(lastItems) + 1} יחידות`}</div>
            <div>{`${lastPrice.toFixed(2)}₪ ליחידה`}</div>
          </span>
        );
      } else {
        discountsArr.push(
          <span className="discountBox">
            {` ${this.props.price} ${
              onlyNumbers.test(this.props.price) ? "₪ ליחידה" : ""
            }`}{" "}
          </span>
        );
      }
    }

    return <div className="postDiscount">{discountsArr}</div>;
  }
}
