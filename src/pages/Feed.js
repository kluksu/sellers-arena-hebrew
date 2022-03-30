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
import BottomNav from "../components/BottomNav";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: [],
      posts: [],
      contactsObj: {},
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
  onMount = () => {
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
  render() {
    let youMayLikeCards = this.props.accountsYouMayLike.map((account) => {
      if (this.state.contactsObj[account.id] === undefined) {
        return (
          <ContactCard
            postAndGetContacts={this.props.postAndGetContacts}
            account={account}
            activeAccount={this.props.activeAccount}
          ></ContactCard>
        );
      }
    });

    let posts = this.state.posts.map((post, i) => {
      let horizontalScrollBox =
        i % 5 == 0 && this.props.screenWidth < 768 ? (
          <HorizontalScrollBox
            id={i}
            content={youMayLikeCards}
          ></HorizontalScrollBox>
        ) : (
          ""
        );

      if (post.event_type === "item_created") {
        return;
        //  (
        //   <>
        //     <NewItemPost
        //       closeGenericModal={this.props.closeGenericModal}
        //       openGenericModal={this.props.openGenericModal}
        //       allThreads={this.props.allThreads}
        //       handleOpenMessage={this.props.handleOpenMessage}
        //       handleClose={this.props.handleClose}
        //       addToContacts={this.props.addToContacts}
        //       activeAccount={this.props.activeAccount}
        //       accessToken={this.props.accessToken}
        //       post={post}
        //     ></NewItemPost>
        //     {horizontalScrollBox}
        //   </>
        // );
      } else if (post.event_type === "account_post") {
        return (
          <div key={post.id}>
            <Post
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
            {horizontalScrollBox}
          </div>
        );
      } else if (post.event_type === "variation_created") {
        return (
          <div key={post.id}>
            <NewVariationPost
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
            {horizontalScrollBox}
          </div>
        );
      } else if (post.event_type === "variation_public_discount_changed") {
        return (
          <div key={post.id}>
            <DiscountPost
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              hidePost={this.hidePost}
              deletePost={this.deletePost}
              // closeGenericModal={this.props.closeGenericModal}
              // openGenericModal={this.props.openGenericModal}
              allThreads={this.props.allThreads}
              handleOpenMessage={this.props.handleOpenMessage}
              handleClose={this.props.handleClose}
              addToContacts={this.props.addToContacts}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
              post={post}
            ></DiscountPost>
            {horizontalScrollBox}
          </div>
        );
      } else if (post.event_type === "variation_price_drop") {
        return (
          <div key={post.id}>
            <PriceDropPost
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              hidePost={this.hidePost}
              deletePost={this.deletePost}
              // closeGenericModal={this.props.closeGenericModal}
              // openGenericModal={this.props.openGenericModal}
              allThreads={this.props.allThreads}
              handleOpenMessage={this.props.handleOpenMessage}
              handleClose={this.props.handleClose}
              addToContacts={this.props.addToContacts}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
              post={post}
            ></PriceDropPost>
            {horizontalScrollBox}
          </div>
        );
      } else if (
        post.event_type === "variation_stock_increase" ||
        post.event_type === "variation_back_in_stock"
      ) {
        return (
          <div key={post.id}>
            <NewStockPost
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              hidePost={this.hidePost}
              deletePost={this.deletePost}
              // closeGenericModal={this.props.closeGenericModal}
              // openGenericModal={this.props.openGenericModal}
              allThreads={this.props.allThreads}
              handleOpenMessage={this.props.handleOpenMessage}
              handleClose={this.props.handleClose}
              addToContacts={this.props.addToContacts}
              activeAccount={this.props.activeAccount}
              accessToken={this.props.accessToken}
              post={post}
            ></NewStockPost>
            {horizontalScrollBox}
          </div>
        );
      }
    });

    let allMessages = [];
    this.props.allMessages.forEach((message) => {
      allMessages.push(<WallMessages userInfo={message}></WallMessages>);
    });

    {
      return (
        <Row>
          <Col xl={3} lg={3} md={3} sm={0} xs={0} className="contactsCardsCol">
            {this.props.screenWidth > 767 ? (
              <div className="contactsCardsRow">
                <div
                  style={{ height: "60px", padding: "30px", fontSize: "20px" }}
                >
                  ספקים בשבילך
                </div>{" "}
                {youMayLikeCards}
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className="wall">
              {/* <Row> */}
              {/* <div className="wallMessages">{allMessages}</div> */}
              <InfiniteScroll
                // className="wall"
                dataLength={posts.length}
                next={() => this.getWallEvents()}
                hasMore={this.state.next !== null ? true : false}
                loader={Loader}
                endMessage={"אין עוד תוצאות"}
              >
                {posts}
              </InfiniteScroll>
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
