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

    console.log(picturesStr);
    let imagesArr = picturesStr.map((picture) => {
      if (picture !== "") {
        console.log(picture);
        return <img src={picture}></img>;
      }
    });
    text = text.split("pictures//")[0];
    return (
      <>
        <div className="postInfo">
          <div className="postText">{text}</div>

          <PostGallery
            post={this.props.post}
            pictures={imagesArr}
          ></PostGallery>
          <PostNavBar
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
