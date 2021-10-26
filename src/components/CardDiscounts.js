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
    let discountsArr = [];
    let prev = 0;
    let price = 0;
    let lastKey = 0;
    let lastPrice = 0;
    let discountClass = "productCardDiscounts";

    if (this.props.variation) {
      let discounts = this.props.variation.discounts;
      discounts["0"] = 0;
      if (Object.keys(discounts).length > 1) {
        for (const [key, value] of Object.entries(discounts)) {
          discountClass = "productCardDiscounts";
          if (key == 0) {
            price = this.props.price * (1 - value).toFixed(2);
            continue;
          }
          discountsArr.push(
            <span className="borderRight">
              <div>
                {prev}-{key} יחידות{" "}
              </div>{" "}
              <div>{price.toFixed(2)}$</div>{" "}
            </span>
          );
          price = this.props.price * (1 - value);
          lastKey = key;
          lastPrice = price;
          if (key > prev) {
            prev = key;
          }
        }

        discountsArr.push(
          <span>
            <div>{`>=${lastKey} יחידות`}</div>
            <div>{`${lastPrice.toFixed(2)}$`}</div>
          </span>
        );
      } else {
        discountsArr.push(<div>{`${this.props.price}$ ליחידה`} </div>);
      }
    }
    return (
      <>
        <div
          style={{ display: this.state.isHIdden, [this.state.isLeft]: "0%" }}
          className={"discountClassCenterHidden productCardDiscounts"}
        >
          {discountsArr}
        </div>
        <div
          style={{
            justifyContent: discountsArr.length !== 1 ? "flex-start" : "center",
          }}
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
