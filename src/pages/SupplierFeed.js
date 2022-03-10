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
import PriceDropPost from "../components/PriceDropPost";
import NewStockPost from "../components/NewStockPost";
import ContactCard from "../components/ContactCard";
import HorizontalScrollBox from "../components/HorizontalScrollBox";
import { withRouter } from "react-router-dom";
import BottomNav from "../components/BottomNav";

class SupplierFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      posts: [],
      next: "",
      myItems: [],
      contactsObj: {},
    };
  }
  createContactsObj = () => {
    if (this.props.activeAccount) {
      // this.props.getContactsMesssageBoard();
      if (this.props.myContacts) {
        this.setState((prevState) => {
          let contactsObj = Object.assign({}, prevState.contactsObj);
          this.props.myContacts.forEach((contact) => {
            // creating copy of state variable jasper
            contactsObj[contact.account_contact.id] = contact; // update the name property, assign a new value
            this.setState({ contactsObj: contactsObj });
          });
        });
      }
    }
  };
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
    let next =
      this.state.next !== ""
        ? this.state.next
        : `${domain}/wall-events/?limit=10&account_id=${this.props.match.params.id}`;

    axios
      .get(
        next
        // {
        //   account_id: this.props.activeAccount.id,
        // },
      )
      .then((res) => {
        this.setState({ next: res.data.next });
        this.setState({ posts: this.state.posts.concat(res.data.results) });
      })
      .catch((error) => {});
  };
  onMount = () => {
    if (this.props.activeAccount) {
      // this.props.getContactsMesssageBoard();
    }
    this.setState({ allMessages: this.props.allMessages });
    this.getWallEvents();
    this.createContactsObj();
  };
  componentDidMount() {
    this.onMount();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.myContacts !== prevProps.myContacts) {
      this.createContactsObj();

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
    // let youMayLikeCards = this.props.accountsYouMayLike.map((account) => {
    //
    //   if (this.state.contactsObj[account.id] === undefined) {
    //     return (
    //       <ContactCard
    //         activeAccount={this.props.activeAccount}
    //         postAndGetContacts={this.props.postAndGetContacts}
    //         account={account}
    //       ></ContactCard>
    //     );
    //   }
    // });

    let posts = this.state.posts.map((post, i) => {
      // let horizontalScrollBox =
      //     i % 5 == 0 && this.props.screenWidth < 768 ? (
      //       <HorizontalScrollBox
      //         headline={"עשוי לעניין אותך"}
      //         id={i}
      //         content={youMayLikeCards}
      //       ></HorizontalScrollBox>
      //     ) : (
      //       ""
      //     );
      if (post.event_type === "item_created") {
        // this.getItem(post.related_id)
        //   .then((res) => {
        return;
        //  (
        //   <>
        //     <NewItemPost
        //       //   hidePost={this.hidePost}
        //       //   deletePost={this.deletePost}
        //       closeGenericModal={this.props.closeGenericModal}
        //       openGenericModal={this.props.openGenericModal}
        //       //   allThreads={this.props.allThreads}
        //       //   handleOpenMessage={this.props.handleOpenMessage}
        //       //   handleClose={this.props.handleClose}
        //       //   addToContacts={this.props.addToContacts}
        //       //   activeAccount={this.props.activeAccount}
        //       //   accessToken={this.props.accessToken}
        //       post={post}
        //     ></NewItemPost>
        //     {/* {horizontalScrollBox} */}
        //   </>
        // );
        // })
        // .catch((error) => {
        //   return;
        // });
      } else if (post.event_type === "account_post") {
        return (
          <>
            <Post
              key={post.id}
              //   hidePost={this.hidePost}
              //   deletePost={this.deletePost}
              //   myItems={this.state.myItems}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              //   allThreads={this.props.allThreads}
              //   handleOpenMessage={this.props.handleOpenMessage}
              //   handleClose={this.props.handleClose}
              //   addToContacts={this.props.addToContacts}
              //   activeAccount={this.props.activeAccount}
              //   accessToken={this.props.accessToken}
              post={post}
            ></Post>
            {/* {horizontalScrollBox} */}
          </>
        );
      } else if (post.event_type === "variation_created") {
        return (
          <>
            <NewVariationPost
              key={post.id}
              //   closeGenericModal={this.props.closeGenericModal}
              //   openGenericModal={this.props.openGenericModal}
              //   hidePost={this.hidePost}
              //   deletePost={this.deletePost}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              //   allThreads={this.props.allThreads}
              //   handleOpenMessage={this.props.handleOpenMessage}
              //   handleClose={this.props.handleClose}
              //   addToContacts={this.props.addToContacts}
              //   activeAccount={this.props.activeAccount}
              //   accessToken={this.props.accessToken}
              post={post}
            ></NewVariationPost>
            {/* {horizontalScrollBox} */}
          </>
        );
      } else if (post.event_type === "variation_public_discount_changed") {
        return (
          <>
            <DiscountPost
              key={post.id}
              //   closeGenericModal={this.props.closeGenericModal}
              //   openGenericModal={this.props.openGenericModal}
              //   hidePost={this.hidePost}
              //   deletePost={this.deletePost}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              //   allThreads={this.props.allThreads}
              //   handleOpenMessage={this.props.handleOpenMessage}
              //   handleClose={this.props.handleClose}
              //   addToContacts={this.props.addToContacts}
              //   activeAccount={this.props.activeAccount}
              //   accessToken={this.props.accessToken}
              post={post}
            ></DiscountPost>
            {/* {horizontalScrollBox} */}
          </>
        );
      } else if (post.event_type === "variation_price_drop") {
        return (
          <>
            <PriceDropPost
              key={post.id}
              //   closeGenericModal={this.props.closeGenericModal}
              //   openGenericModal={this.props.openGenericModal}
              //   hidePost={this.hidePost}
              //   deletePost={this.deletePost}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              //   allThreads={this.props.allThreads}
              //   handleOpenMessage={this.props.handleOpenMessage}
              //   handleClose={this.props.handleClose}
              //   addToContacts={this.props.addToContacts}
              //   activeAccount={this.props.activeAccount}
              //   accessToken={this.props.accessToken}
              post={post}
            ></PriceDropPost>
            {/* {horizontalScrollBox} */}
          </>
        );
      } else if (post.event_type === "variation_stock_increase") {
        return (
          <>
            <NewStockPost
              key={post.id}
              //   closeGenericModal={this.props.closeGenericModal}
              //   openGenericModal={this.props.openGenericModal}
              //   hidePost={this.hidePost}
              //   deletePost={this.deletePost}
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              //   allThreads={this.props.allThreads}
              //   handleOpenMessage={this.props.handleOpenMessage}
              //   handleClose={this.props.handleClose}
              //   addToContacts={this.props.addToContacts}
              //   activeAccount={this.props.activeAccount}
              //   accessToken={this.props.accessToken}
              post={post}
            ></NewStockPost>
            {/* {horizontalScrollBox} */}
          </>
        );
      }
    });
    // let allMessages = [];
    // this.props.allMessages.forEach((message) => {
    //   allMessages.push(<WallMessages userInfo={message}></WallMessages>);
    // });

    {
      return (
        <Row>
          {!this.props.href ? (
            this.props.screenWidth > 767 ? (
              <div className="contactsCardsRow">
                <div
                  style={{ height: "60px", padding: "30px", fontSize: "20px" }}
                >
                  ספקים בשבילך
                </div>{" "}
                {/* {youMayLikeCards} */}
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Col
            xl={3}
            lg={3}
            md={3}
            sm={0}
            xs={0}
            className="contactsCardsCol"
          ></Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="wall">
              {/* <Row> */}{" "}
              {/* <PostComponent
                getStateInfo={this.getStateInfo}
                closeGenericModal={this.props.closeGenericModal}
                openGenericModal={this.props.openGenericModal}
                activeAccount={this.props.activeAccount}
                accessToken={this.props.accessToken}
              ></PostComponent> */}
              {/* <div className="wallMessages">{allMessages}</div> */}
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
          </Col>
          <Col xl={3} lg={3} md={3} sm={0} xs={0}></Col>
          {/* <BottomNav></BottomNav> */}
        </Row>
      );
    }
  }
}
export default withRouter(SupplierFeed);
