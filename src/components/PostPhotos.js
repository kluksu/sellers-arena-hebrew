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
          {this.props.isVariation !== true ? (
            <>
              {" "}
              <div
                id={`wallProductCardVariationsGallery` + this.props.post.id}
                className="wallProductCardVariationsGallery"
              >
                {this.props.variationsPictures}
              </div>
              <ScrollButtons
                elementID={
                  `wallProductCardVariationsGallery` + this.props.post.id
                }
                scrollLeft={100}
                scrollRight={100}
              ></ScrollButtons>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
