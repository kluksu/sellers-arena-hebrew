import React, { Component } from "react";
import PostGallery from "./PostGallery";
import PostNavBar from "./PostNavBar";

export default class PostInfo extends Component {
  render() {
    let text = this.props.post.text.split("post:").pop();
    let picturesStr = this.props.post.text.split("pictures//").pop();
    picturesStr = picturesStr.replace("[", "");
    picturesStr = picturesStr.replace("]", "");
    // picturesStr = picturesStr.replaceAll("/", "");
    // picturesStr = picturesStr.replaceAll('"', "");

    picturesStr = picturesStr.split(`,`);

    let imagesArr = picturesStr.map((picture) => {
      if (picture !== "") {
        return (
          <img
            className="postGalleryPic"
            onClick={() =>
              this.props.openGenericModal("", <img src={picture}></img>)
            }
            src={picture}
          ></img>
        );
      }
    });
    text = text.split("pictures//")[0];
    return (
      <>
        <div className="postInfo">
          <div className="postText">{text}</div>
          {imagesArr.length > 1 ? (
            <PostGallery
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              post={this.props.post}
              pictures={imagesArr}
            ></PostGallery>
          ) : (
            ""
          )}

          <PostNavBar
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            post={this.props.post}
            threadID={this.props.threadID}
            addToContacts={this.props.addToContacts}
            handleOpenMessage={this.props.handleOpenMessage}
          ></PostNavBar>
        </div>{" "}
      </>
    );
  }
}
