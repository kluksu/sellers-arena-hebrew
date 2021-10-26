import React, { Component } from "react";
import { Col, NavLink, Row, Button, Form } from "react-bootstrap";
import { HashRouter, Route, Router, withRouter } from "react-router-dom";
import InfoBox from "../components/InfoBox";
import CardDiscounts from "./CardDiscounts";
import QuantitySelector from "./QuantitySelector";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: "",
    };
  }
  getNotice = (notice) => {
    this.setState({ notice: notice });
  };
  render() {
    //not sure
    let cardZoom = this.props.screenWidth > 1000 ? "zoomCard" : "";
    //not sure
    console.log(navigator.userAgent);
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
            price = this.props.price * (1 - value);
            continue;
          }
          discountsArr.push(
            <span className="borderRight">
              <div>
                {prev}-{key} יחידות{" "}
              </div>{" "}
              <div>{price}₪</div>{" "}
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
            <div>{`${lastPrice}₪`}</div>
          </span>
        );
      } else {
        discountsArr.push(<div>{`${this.props.price}₪ ליחידה`} </div>);
      }
    }
    let buttons =
      !this.props.linkAllAround && this.props.activeAccount ? (
        <>
          <QuantitySelector
            activeAccount={this.props.activeAccount}
            getCartProducts={this.props.getCartProducts}
            variation={this.props.variation}
            value={this.props.value}
            getNotice={this.getNotice}
          ></QuantitySelector>
        </>
      ) : null;

    ////make product name shortName, couses bug if name is longer then card right now.
    const picture =
      this.props.pictures !== null
        ? this.props.pictures
        : "https://cdn.pixabay.com/photo/2014/06/18/18/42/running-shoe-371625__340.jpg";
    const storeLInksAcive = this.props.linkAllAround;
    const batchSize = this.props.variation ? (
      <div>כמות מנה {this.props.variation.batch_size}</div>
    ) : null;

    if (this.props.type == 10) {
      return (
        <Col
          xl={2}
          lg={4}
          className={`productCardContainer  ${cardZoom} ${this.props.extraClassName}`}
        >
          <NavLink
            href={this.props.linkAllAround}
            className={`productCardContainer`}
          >
            <Row>
              <Col xs={6}>
                <p className="FormRejects absoluteCardNotice">
                  {this.state.notice}
                </p>

                <NavLink src="">לחנות</NavLink>
              </Col>
              <Col xs={6}>
                {" "}
                <NavLink
                  onClick={() =>
                    window.location.assign(this.props.productInfoLink)
                  }
                >
                  למוצר
                </NavLink>
              </Col>
            </Row>

            <div className="imageContainer">
              <img src={picture} alt="no picture" />
            </div>
            <div className="cardInfo">i</div>
            <InfoBox
              variation={this.props.variation}
              item={this.props.item}
            ></InfoBox>
            <div> {this.props.supplier}</div>
          </NavLink>
        </Col>
      );
    } else {
      return (
        <div className={`type2card  ${cardZoom}`}>
          <NavLink href={this.props.linkAllAround} className={`type2card`}>
            <div className="type2cardImage">
              <img className="zoomCardImg" src={picture} alt="no picture" />
            </div>
            <CardDiscounts
              variation={this.props.variation}
              price={this.props.price}
            ></CardDiscounts>
            <div className="lowerProductCard">
              <div>{this.props.productName}</div>
              {/* <div>{`${this.props.price} ${this.props.currency}`}</div> */}
              {batchSize}
              <div className="cardInfo">i</div>
              <InfoBox
                variation={this.props.variation}
                item={this.props.item}
              ></InfoBox>
              <div className="CardUnitsFormContainer">{buttons}</div>
            </div>
            <p className="FormRejects absoluteCardNotice">
              {this.state.notice}
            </p>
            <NavLink
              onClick={() => window.location.assign(this.props.productInfoLink)}
            >
              למוצר
            </NavLink>
          </NavLink>
        </div>
      );
    }
  }
}
export default withRouter(ProductCard);
