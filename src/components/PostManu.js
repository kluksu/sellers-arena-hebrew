import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import PostComponent from "./PostComponent";
import axios from "axios";
import { domain } from "./utils";

export default class PostManu extends Component {
  openDeletPostModal = () => {
    this.props.openGenericModal(
      "האם ברצונך למחוק את הפוסט?",
      "",
      <Button
        onClick={() => {
          this.props
            .deletePost(this.props.post.id)
            .then((res) => {
              this.props.openGenericModal("הפוסט נמחק בהצלחה");
              this.props.hidePost(this.props.post.id);
              this.props.toggleManu();
            })
            .catch((er) => {
              this.props.openGenericModal(
                "משהו השתבש",
                "אנא נסה שנית מאוחר יותר"
              );
            });
        }}
        variant="danger"
      >
        מחק
      </Button>
    );
  };
  openEdit = () => {
    this.props.openGenericModal(
      "",
      <PostComponent
        hidePost={this.props.hidePost}
        deletePost={this.props.deletePost}
        myItems={this.props.myItems}
        closeGenericModal={this.props.closeGenericModal}
        openGenericModal={this.props.openGenericModal}
        threadID={this.props.threadID}
        allThreads={this.props.allThreads}
        handleOpenMessage={this.props.handleOpenMessage}
        handleClose={this.props.handleClose}
        addToContacts={this.props.addToContacts}
        activeAccount={this.props.activeAccount}
        accessToken={this.props.accessToken}
        post={this.props.post}
      ></PostComponent>,
      "",
      "",
      "modal70W"
    );
  };

  render() {
    return (
      <div
        style={{ display: this.props.isManuOpen === true ? "block" : "none" }}
        className="postManu"
      >
        <ListGroup variant="flush">
          {this.props.post.event_type === "account_post" ? (
            <ListGroup.Item onClick={this.openEdit} action>
              עריכה
            </ListGroup.Item>
          ) : (
            ""
          )}

          <ListGroup.Item onClick={this.openDeletPostModal} action>
            מחק פוסט
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}
