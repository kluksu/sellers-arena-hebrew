import axios from "axios";
import { split } from "lodash";
import React, { Component } from "react";

import ProductCard from "../components/ProductCard";
import ThreeDots from "./ThreeDots";
import { domain } from "./utils";
import WallProductCard from "./WallProductCard";

export default class NewItemPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let postHeadline = this.props.post.text.split("post")[0];
    if (this.props.isVariation !== true) {
      postHeadline = postHeadline.replace("Account", "");
      postHeadline = postHeadline.replace(
        "has added a new item",
        " העלה מוצר חדש פה"
      );

      postHeadline = postHeadline.split("פה")[0];
    } else {
      postHeadline = postHeadline.split(" ");

      postHeadline = `${postHeadline[1]} העלה דגם חדש של המוצר ${
        postHeadline[postHeadline.length - 1]
      }`;
    }
    let date = new Date("2015-03-25T12:00:00Z");

    return (
      <div className="post">
        <div className="newItemPostContainer">
          {/* <div className="postDate">
          {" "}
          {Date(`${this.props.post.created_at}`)}{" "}
        </div> */}
          <div className="postDate">
            {" "}
            <span> {Date(`${this.props.post.created_at}`)}</span>{" "}
            <ThreeDots
              hidePost={this.props.hidePost}
              deletePost={this.props.deletePost}
              myItems={this.props.myItems}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              // threadID={this.state.threadID}
              allThreads={this.props.allThreads}
              handleOpenMessage={this.props.handleOpenMessage}
              handleClose={this.props.handleClose}
              addToContacts={this.props.addToContacts}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
              post={this.props.post}
              openPostManu={this.openPostManu}
              isPostManuOpen={this.state.isPostManuOpen}
            >
              {" "}
            </ThreeDots>
          </div>

          <div className="postHeadline">
            {postHeadline}{" "}
            <img src="https://cdn.pixabay.com/photo/2016/07/05/01/07/new-icon-1497910_960_720.png"></img>
            &nbsp;
          </div>
          {/* item={fullItem.item}
              onclickFunc={this.additMyItems}
              pictures={fullItem.item.image}
              supplier={""}
              productName={fullItem.item.name}
              price={""}
              currency=""
              fullItem={fullItem}
              linkAllAround={`/#/edit_item/${fullItem.item.id}`} */}
          <WallProductCard
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.handleClose}
            addToContacts={this.props.addToContacts}
            post={this.props.post}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            itemID={
              this.props.isVariation === true
                ? null
                : this.props.post.related_id
            }
            variationID={
              this.props.isVariation === true
                ? this.props.post.related_id
                : null
            }
            isVariation={this.props.isVariation}
          ></WallProductCard>
        </div>
      </div>
    );
  }
}
