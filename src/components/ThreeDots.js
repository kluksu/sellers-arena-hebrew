import React, { Component } from "react";
import PostManu from "./PostManu";

export default class ThreeDots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManuOpen: false,
    };
  }
  toggleManu = () => {
    this.setState({
      isManuOpen: this.state.isManuOpen === true ? false : true,
    });
  };
  render() {
    return (
      <>
        <span className="threeDots">
          <div onClick={() => this.toggleManu()}>...</div>
          <div>
            {" "}
            <PostManu
              toggleManu={this.toggleManu}
              hidePost={this.props.hidePost}
              deletePost={this.props.deletePost}
              myItems={this.props.myItems}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              threadID={this.state.threadID}
              allThreads={this.props.allThreads}
              handleOpenMessage={this.props.handleOpenMessage}
              handleClose={this.props.handleClose}
              addToContacts={this.props.addToContacts}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
              post={this.props.post}
              isManuOpen={this.state.isManuOpen}
            ></PostManu>
          </div>
        </span>
      </>
    );
  }
}
