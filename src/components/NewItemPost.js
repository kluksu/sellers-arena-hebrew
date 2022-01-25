import axios from "axios";
import React, { Component } from "react";

import ProductCard from "../components/ProductCard";
import { domain } from "./utils";
import WallProductCard from "./WallProductCard";

export default class NewItemPost extends Component {
  componentDidMount() {}
  render() {
    let postHeadline = this.props.post.text.split("post")[0];

    postHeadline = postHeadline.replace("Account", "");
    postHeadline = postHeadline.replace(
      `${
        this.props.isVariation === true
          ? "has added a new variation to item "
          : "has added a new item"
      }`,
      " העלה מוצר חדש פה"
    );

    postHeadline = postHeadline.split("פה")[0];
    let date = new Date("2015-03-25T12:00:00Z");

    return (
      <div className="newItemPostContainer">
        <div className="postDate">
          {" "}
          {Date(`${this.props.post.created_at}`)}{" "}
        </div>

        <div>
          {postHeadline}{" "}
          <img src="https://cdn.pixabay.com/photo/2012/04/24/16/22/check-40319_960_720.png"></img>
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
          allThreads={this.props.allThreads}
          handleOpenMessage={this.props.handleOpenMessage}
          handleClose={this.handleClose}
          addToContacts={this.props.addToContacts}
          post={this.props.post}
          activeAccount={this.props.activeAccount}
          accessToken={this.props.accessToken}
          itemID={
            this.props.isVariation === true ? null : this.props.post.related_id
          }
          variationID={
            this.props.isVariation === true ? this.props.post.related_id : null
          }
          isVariation={this.props.isVariation}
        ></WallProductCard>
      </div>
    );
  }
}
