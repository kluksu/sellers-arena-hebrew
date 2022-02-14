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
import DiscountPost from "../components/DiscountPost";

export default class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      posts: [],
      next: "",
      myItems: [],
    };
  }
  hidePost = (postID) => {
    let posts = this.state.posts;
    posts.forEach((post, i) => {
      if (post.id == postID) {
        posts.splice(i, 1);
        this.setState({ posts: posts });
      }
    });
  };
  deletePost = (postID) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.post(
      `${domain}/my-accounts/${this.props.activeAccount.id}/delete_event/`,
      {
        event_id: postID,
      },
      config
    );
  };
  getStateInfo = (state, value) => {
    this.setState({ [state]: value });
  };
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
          : `${domain}/wall-events/?account_id=${
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
  getItem = (itemID) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(`${domain}/public-items/${itemID}/`, config);
  };
  render() {
    let posts = this.state.posts.map((post) => {
      if (post.event_type === "item_created") {
        this.getItem(post.related_id)
          .then((res) => {
            return (
              <NewItemPost
                hidePost={this.hidePost}
                deletePost={this.deletePost}
                closeGenericModal={this.props.closeGenericModal}
                openGenericModal={this.props.openGenericModal}
                allThreads={this.props.allThreads}
                handleOpenMessage={this.props.handleOpenMessage}
                handleClose={this.props.handleClose}
                addToContacts={this.props.addToContacts}
                activeAccount={this.props.activeAccount}
                accessToken={this.props.accessToken}
                post={post}
              ></NewItemPost>
            );
          })
          .catch((error) => {
            return;
          });
      } else if (post.event_type === "account_post") {
        return (
          <Post
            hidePost={this.hidePost}
            deletePost={this.deletePost}
            myItems={this.state.myItems}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></Post>
        );
      } else if (post.event_type === "variation_created") {
        return (
          <NewVariationPost
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            hidePost={this.hidePost}
            deletePost={this.deletePost}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></NewVariationPost>
        );
      } else if (post.event_type === "variation_public_discount_changed") {
        return (
          <DiscountPost
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            hidePost={this.hidePost}
            deletePost={this.deletePost}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            allThreads={this.props.allThreads}
            handleOpenMessage={this.props.handleOpenMessage}
            handleClose={this.props.handleClose}
            addToContacts={this.props.addToContacts}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            post={post}
          ></DiscountPost>
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
            getStateInfo={this.getStateInfo}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
          ></PostComponent>
          <div className="wallMessages">{allMessages}</div>
          <InfiniteScroll
            // style={{ overFlowX: "visible" }}
            // className="wall"
            dataLength={posts.length}
            next={() => this.getWallEvents()}
            hasMore={this.state.next !== null ? true : false}
            loader={Loader}
            endMessage={"אין עוד תוצאות"}
          >
            {posts}
          </InfiniteScroll>{" "}
          {/* </Row> */}
        </div>
      );
    }
  }
}
