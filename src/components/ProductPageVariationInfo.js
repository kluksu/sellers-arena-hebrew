import React, { Component } from "react";
import { Col, NavLink, Row, Form, FormLabel } from "react-bootstrap";
import CardDiscounts from "./CardDiscounts";

export default class ProductPageVariationInfo extends Component {
  render() {
    const pickVariation = this.props.pickVariation
      ? () => this.props.pickVariation(this.props.variation.id)
      : null;
    if (this.props.variation !== undefined && this.props.variation !== null) {
      let varVariationArr = [];
      if (this.props.variation.variation) {
        for (const [key, value] of Object.entries(
          this.props.variation.variation
        )) {
          varVariationArr.push(
            <Row>
              <div>
                {key}: {value}
              </div>
            </Row>
          );
        }
      }
      // let discountsArr = [];
      // if (this.props.variation.discounts) {
      //   for (const [key, value] of Object.entries(
      //     this.props.variation.discounts
      //   )) {
      //     discountsArr.push(
      //       <Row>
      //         <div>
      //           {key}: {value}
      //         </div>
      //       </Row>
      //     );
      //   }
      // }

      return (
        <div
          className="productVariationInfo"
          onClick={() => pickVariation(this.props.variation.id)}
        >
          <Row>
            <Col>
              <Row>
                <h4>קוד מוצר: {this.props.variation.id}</h4>
              </Row>
              <Row>
                <div>כמות מנה: {this.props.variation.batch_size}</div>
              </Row>
              <Row>
                <span>מחיר ליחידה: {this.props.variation.cost_per_item}</span>
              </Row>

              <Row>
                <div>תיאור: {this.props.variation.description}</div>
              </Row>
              {varVariationArr}
            </Col>
            <Col className="productPagePictureContainer">
              <img
                src={
                  this.props.variation.image
                    ? this.props.variation.image
                    : this.props.item.image
                }
                fluid
                alt="variation picture"
              ></img>
              <CardDiscounts
                variation={this.props.variation}
                price={this.props.variation.cost_per_item}
              ></CardDiscounts>
              {/* {discountsArr} */}
            </Col>
          </Row>
        </div>
      );
    }
  }
}
