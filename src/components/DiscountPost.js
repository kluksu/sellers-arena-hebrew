import axios from "axios";
import React, { Component } from "react";
import PostDiscount from "./PostDiscount";
import ThreeDots from "./ThreeDots";
import { domain } from "./utils";
import WallProductCard from "./WallProductCard";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostManuOpen: false,
      variation: {},
    };
  }
  getVariation = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(
      `${domain}/public-item-variations/${this.props.post.related_id}/`,
      config
    );
  };
  componentDidMount() {
    this.getVariation().then((res) => {
      this.setState({ variation: res.data });
    });
  }
  render() {
    let postHeadline = this.props.post.text.split("post")[0];
    postHeadline = postHeadline.split(" ");
    postHeadline = `${postHeadline[1]} הוסיף הנחת כמות חדשה!`;
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
            <img
              // className="spinning"
              src="https://cdn.pixabay.com/photo/2017/02/21/12/14/the-sale-2085766_960_720.png"
            ></img>
            &nbsp;
          </div>
          {Object.keys(this.state.variation).length > 0 ? (
            <PostDiscount
              price={this.state.variation.cost_per_item}
              variation={this.state.variation}
            ></PostDiscount>
          ) : (
            ""
          )}
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
            itemID={null}
            variationID={this.props.post.related_id}
            isVariation={true}
          ></WallProductCard>

          {/* item={fullItem.item}
                    onclickFunc={this.additMyItems}
                    pictures={fullItem.item.image}
                    supplier={""}
                    productName={fullItem.item.name}
                    price={""}
                    currency=""
                    fullItem={fullItem}
                    linkAllAround={`/#/edit_item/${fullItem.item.id}`} */}
        </div>
      </div>
    );
  }
}
