import React, { Component } from "react";
import ScrollButtons from "./ScrollButtons";

export default class PostPhotos extends Component {
  render() {
    return (
      <div>
        <img
          src={
            this.props.mainPicture
              ? this.props.mainPicture
              : this.props.item.image
          }
        ></img>
        <div className="wallProductCardVariationsGallery">
          <div
            id="wallProductCardVariationsGallery"
            className="wallProductCardVariationsGallery"
          >
            {this.props.variationsPictures}
          </div>
          <ScrollButtons
            elementID={"wallProductCardVariationsGallery"}
            scrollLeft={100}
            scrollRight={100}
          ></ScrollButtons>
        </div>
      </div>
    );
  }
}
