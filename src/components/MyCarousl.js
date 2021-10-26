import React, { Component } from "react";
import { Col, NavLink, Row, Carousel } from "react-bootstrap";

export default class MyCarousl extends Component {
  render() {
    const carousleArr = [];
    let interval = !this.props.selectedVariationID ? 4000 : 4000;
    this.props.variations.forEach((variation) => {
      let carouselItem = (
        <Carousel.Item>
          {" "}
          <img
            className="d-block w-100"
            src={variation.image}
            alt={`variation ${variation.id} image`}
          />{" "}
          <Carousel.Caption>
            {" "}
            <h6>קוד מוצר {variation.id}</h6>
          </Carousel.Caption>{" "}
        </Carousel.Item>
      );
      if (this.props.selectedVariationID == variation.id) {
        ///if the push below is changed to unshift, a click on an item will chage thie picture in the carousle
        //to that item image, bug with a bug
        carousleArr.push(carouselItem);
      } else carousleArr.push(carouselItem);
    });
    return (
      <Carousel fade className="CarouslContainer w-50" interval={interval}>
        {carousleArr}
      </Carousel>
    );
  }
}
