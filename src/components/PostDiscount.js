import React, { Component } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiscounts: "none",
    };
  }
  showDiscounts = () => {
    this.setState({
      showDiscounts: this.state.showDiscounts === "none" ? "flex" : "none",
    });
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
        for (const [Items, value] of Object.entries(discounts)) {
          discountClass = "productCardDiscounts";
          if (Items == 0) {
            price = this.props.price * (1 - value).toFixed(2);
            continue;
          }
          discountsArr.push(
            <div
              onClick={() => this.showDiscounts()}
              // className="priceFrom"

              // className="borderRight"
            >
              {parseInt(prev) + 1}-{Items} יחידות {price.toFixed(2)}₪ ליחידה{" "}
            </div>
          );
          price = this.props.price * (1 - value);
          lastItems = Items;
          lastPrice = price;
          if (parseInt(Items) > parseInt(prev)) {
            prev = Items;
          }
        }

        discountsArr.push(
          <div
            onClick={() => this.showDiscounts()}
            // className="priceFrom"
          >
            {`>=${parseInt(lastItems) + 1} יחידות`}{" "}
            {`${lastPrice.toFixed(2)}₪ ליחידה`}
          </div>
        );
      } else {
        discountsArr.push(
          <div>
            {` ${this.props.price} ${
              onlyNumbers.test(this.props.price) ? "₪ ליחידה" : ""
            }`}{" "}
          </div>
        );
      }
    }

    return (
      <div>
        <div onClick={() => this.showDiscounts()} className="priceFrom">
          {" "}
          <div> החל מ-{lastPrice.toFixed(2)} ש"ח ליחידה</div>
          <div>
            <IoIosArrowDown></IoIosArrowDown>
          </div>
        </div>
        <div
          className="postDiscountsDropDown"
          style={{
            display: this.state.showDiscounts,
            // background: "#007bff",
            // color: "white",
            // height: this.state.showDiscounts === "none" ? "0px" : "auto",
          }}
        >
          {" "}
          {discountsArr}
        </div>
      </div>
    );
    //  <div className="postDiscount">{discountsArr}</div>;
  }
}
