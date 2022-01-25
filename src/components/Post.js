import React, { Component } from "react";
import PostInfo from "./PostInfo";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadID: "",
    };
  }
  getThreadID = (userID) => {
    this.props.allThreads.forEach((thread) => {
      if (
        thread.participants[0].id == userID ||
        thread.participants[1].id == userID
      ) {
        this.setState({ threadID: thread.id });
        return;
      }
    });
  };
  componentDidMount() {
    this.getThreadID(this.props.post.account_id);
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allThreads !== prevProps.allThreads) {
      this.getThreadID(this.props.post.account_id);
    }
  };
  render() {
    let postHeadline = this.props.post.text.split("post")[0];

    postHeadline = postHeadline.replace("Account", "");
    postHeadline = postHeadline.replace("has added a new ", "העלה פוסט חדש");

    postHeadline = postHeadline.split("פה")[0];
    let date = new Date("2015-03-25T12:00:00Z");

    return (
      <div className="post">
        <div className="newItemPostContainer">
          <div>
            <div className="postDate">
              {" "}
              {Date(`${this.props.post.created_at}`)}{" "}
            </div>

            <div>
              {postHeadline}{" "}
              <img src="https://cdn.pixabay.com/photo/2016/06/15/15/02/info-1459077_960_720.png"></img>
              &nbsp;
            </div>
          </div>
          <PostInfo
            threadID={this.state.threadID}
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={this.props.post}
          ></PostInfo>
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
