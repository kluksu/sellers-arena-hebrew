import React, { Component } from "react";
import ThreeDots from "./ThreeDots";
import WallProductCard from "./WallProductCard";

class PriceDropPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostManuOpen: false,
    };
  }
  render() {
    let postHeadline = this.props.post.text.split("post")[0];
    postHeadline = postHeadline.split(" ");
    postHeadline = `${postHeadline[1]}   הוריד מחיר למוצר`;
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
              className="spinning"
              src="https://cdn.pixabay.com/photo/2014/04/02/11/15/arrow-305710_960_720.png"
            ></img>
            &nbsp;
          </div>

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

export default PriceDropPost;
