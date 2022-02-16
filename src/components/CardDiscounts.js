import React, { Component } from "react";
import { GiEnlightenment } from "react-icons/gi";

export default class CardDiscounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHIdden: "none",
      isLeft: "",
    };
  }
  getPositionAndShow = (event) => {
    let position = event.clientX;
    let halfScreenWidth = window.innerWidth / 2;
    this.setState({ isHIdden: "flex" });
    if (position < halfScreenWidth) {
      this.setState({ isLeft: "left" });
    } else {
      this.setState({ isLeft: "right" });
    }
  };
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
        for (let [Items, value] of Object.entries(discounts)) {
          Items = parseFloat(Items);
          value = parseFloat(value);
          discountClass = "productCardDiscounts";
          if (Items == 0) {
            price = parseInt(this.props.price) * (1 - value).toFixed(2);
            continue;
          }
          discountsArr.push(
            <span className="discountBox">
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
          <div>
            {` ${this.props.price} 
            ${
              "" // onlyNumbers.test(this.props.price) ? "₪ ליחידה" : ""
            }
              ₪`}{" "}
          </div>
        );
      }
    }

    let anyNumbers = new RegExp(/\d/);

    return (
      <>
        <div
          onClick={this.getPositionAndShow}
          onMouseEnter={this.getPositionAndShow}
          onMouseLeave={() => this.setState({ isHIdden: "none" })}
          style={{ display: this.state.isHIdden, [this.state.isLeft]: "0%" }}
          className={"discountClassCenterHidden productCardDiscounts"}
        >
          {discountsArr}
        </div>
        <div
          style={{
            justifyContent:
              discountsArr.length !== 1 || !anyNumbers.test(this.props.price)
                ? "flex-end"
                : "center",
          }}
          onClick={this.getPositionAndShow}
          onMouseEnter={this.getPositionAndShow}
          onMouseLeave={() => this.setState({ isHIdden: "none" })}
          className={discountClass}
        >
          {discountsArr}
        </div>
      </>
    );
  }
}
