import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import FullPageLoader from "../components/FullPageLoader";
import PostComponent from "../components/PostComponent";
import { domain } from "../components/utils";
import WallMessages from "../components/WallMessages";
import NewItemPost from "../components/NewItemPost";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import NewVariationPost from "../components/NewVariationPost";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      posts: [],
      next: "",
    };
  }
  getWallEvents = () => {
    if (this.props.activeAccount) {
      const authorization = !this.props.accessToken
        ? null
        : `Bearer ${this.props.accessToken}`;
      const config = {
        headers: { "Content-Type": "application/json", authorization },
      };
      let next =
        this.state.next !== ""
          ? this.state.next
          : `${domain}/wall-events-contacts/?account_id=${
              this.props.activeAccount ? this.props.activeAccount.id : ""
            }&limit=20`;

      axios
        .get(
          next,
          // {
          //   account_id: this.props.activeAccount.id,
          // },
          config
        )
        .then((res) => {
          this.setState({ next: res.data.next });
          this.setState({ posts: this.state.posts.concat(res.data.results) });
        })
        .catch((error) => {});
    }
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
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></NewItemPost>
        );
      } else if (post.event_type === "account_post") {
        return (
          <Post
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></Post>
        );
      }
      //    else if (post.event_type === "variation_created") {
      //     return (
      //       <NewVariationPost
      //         allThreads={this.props.allThreads}
      //         handleOpenMessage={this.props.handleOpenMessage}
      //         handleClose={this.props.handleClose}
      //         addToContacts={this.props.addToContacts}
      //         activeAccount={this.props.activeAccount}
      //         accessToken={this.props.accessToken}
      //         post={post}
      //       ></NewVariationPost>
      //     );
      //   }
    });

    let allMessages = [];
    this.props.allMessages.forEach((message) => {
      allMessages.push(<WallMessages userInfo={message}></WallMessages>);
    });

    {
      return (
        <div className="wall">
          {/* <Row> */}
          {/* <div className="wallMessages">{allMessages}</div> */}
          <InfiniteScroll
            // className="wall"
            dataLength={posts.length}
            next={() => this.getWallEvents()}
            hasMore={this.state.next !== null ? true : false}
            loader={Loader}
          >
            {posts}
          </InfiniteScroll>
          {/* </Row> */}
        </div>
      );
    }
  }
}
