import React, { Component } from "react";
import NewItemPost from "./NewItemPost";

export default class NewVariationPost extends Component {
  render() {
    return (
      <NewItemPost
        hidePost={this.props.hidePost}
        deletePost={this.props.deletePost}
        closeGenericModal={this.props.closeGenericModal}
        openGenericModal={this.props.openGenericModal}
        allThreads={this.props.allThreads}
        handleOpenMessage={this.props.handleOpenMessage}
        handleClose={this.props.handleClose}
        addToContacts={this.props.addToContacts}
        activeAccount={this.props.activeAccount}
        accessToken={this.props.accessToken}
        post={this.props.post}
        isVariation={true}
      ></NewItemPost>
    );
  }
}
