import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import FullPageLoader from "../components/FullPageLoader";
import PostComponent from "../components/PostComponent";
import { domain } from "../components/utils";
import WallMessages from "../components/WallMessages";
import NewItemPost from "../components/NewItemPost";

export default class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      posts: [],
    };
  }
  getWallEvents = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(
        `${domain}/wall-events/`,
        // {
        //   account_id: this.props.activeAccount.id,
        // },
        config
      )
      .then((res) => {
        this.setState({ posts: res.data.results });
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onMount = () => {
    if (this.props.activeAccount) {
      // this.props.getContactsMesssageBoard();
    }
    this.setState({ allMessages: this.props.allMessages });
    this.getWallEvents();
  };
  componentDidMount() {
    this.onMount();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.myContacts !== prevProps.myContacts) {
      if (this.props.activeAccount) {
        // this.props.getContactsMesssageBoard();
      }
    }
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.onMount();
    }
  }
  render() {
    let posts = this.state.posts.map((post) => {
      if (post.event_type === "item_created") {
        return (
          <NewItemPost
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></NewItemPost>
        );
      }
    });
    let allMessages = [];
    this.props.allMessages.forEach((message) => {
      allMessages.push(<WallMessages userInfo={message}></WallMessages>);
    });

    {
      return (
        <div className="wall">
          {/* <Row> */}{" "}
          <PostComponent
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
          ></PostComponent>
          <div className="wallMessages">{allMessages}</div>
          <div>{posts}</div>
          {/* </Row> */}
        </div>
      );
    }
  }
}
