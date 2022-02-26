import React, { Component } from "react";
import Loader from "react-loader-spinner";
import PrecentOff from "./PrecentOff";
import ScrollButtons from "./ScrollButtons";
import SpacielOffer from "./SpacielOffer";

export default class PostPhotos extends Component {
  render() {
    return (
      <div>
        <div className="postPhotosUpperImageContainer">
          {" "}
          {this.props.item.image || this.props.mainPicture ? (
            <img
              src={
                this.props.mainPicture
                  ? this.props.mainPicture
                  : this.props.item.image
              }
            ></img>
          ) : (
            <Loader type="TailSpin" color="gray"></Loader>
          )}
          {this.props.discountPrecentage ? (
            <PrecentOff precent={this.props.discountPrecentage}></PrecentOff>
          ) : (
            ""
          )}
        </div>

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
