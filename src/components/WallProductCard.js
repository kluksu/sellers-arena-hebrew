import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollButtons from "./ScrollButtons";
import { domain, isOverflown } from "./utils";

import PostPhotos from "./PostPhotos";
import PostNavBar from "./PostNavBar";
import CardDiscounts from "./CardDiscounts";

export default class WallProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      selectedAccount: {},
      mainPicture: "",
      readMore: false,
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.allThreads !== prevProps.allThreads) {
      this.getThreadID(this.props.post.account_id);
    }
  }
  readMore = () => {
    this.setState({ readMore: true });
  };
  makeMainPic = (picture) => {
    this.setState({ mainPicture: picture });
  };
  getPostInfo = (itemID, accountID) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(
        `${domain}/${
          this.props.isVariation === true ? "item-variations" : "public-items"
        }/${itemID}/`,
        config
      ) ///wait for public variations
      .then((res) => {
        this.setState({ selectedItem: res.data });
        axios
          .get(`${domain}/public-accounts/${accountID}/`, config)
          .then((data) => {
            this.setState({ selectedAccount: data.data });
          });
      })
      .catch((error) => {});
  };
  componentDidMount = () => {
    this.getThreadID(this.props.post.account_id);
    if (isOverflown(`PostDescriptionRow${this.props.post.id}`, "y") === false) {
      this.setState({ readMore: true });
    }
    this.getPostInfo(
      this.props.isVariation === true
        ? this.props.variationID
        : this.props.itemID,
      this.props.post.account_id
    );
  };
  render() {
    let item = this.state.selectedItem;
    let variationsPictures =
      item && item.item_variations ? (
        item.item_variations.map((variation) => {
          return (
            <img
              onClick={() => this.makeMainPic(variation.image)}
              src={variation.image}
            ></img>
          );
        })
      ) : (
        <img
          // onClick={() => this.makeMainPic(variation.image)}
          src={item.image}
        ></img>
      );
    let miniVarsArr = [];

    if (item.variation !== undefined) {
      Object.entries(item.variation).forEach((variation) => {
        miniVarsArr.push(<Row>{`${variation[0]} : ${variation[1]}`}</Row>);
      });
    }

    // }
    //
    // if (this.props.isVariation === true && item.variation) {
    //

    return (
      <>
        <Row className="wallProductCardContainer">
          <Col st xl={6} lg={6} md={12} sm={12} xs={12}>
            <PostPhotos
              mainPicture={this.state.mainPicture}
              variationsPictures={variationsPictures}
              item={item}
              post={this.props.post}
              isVariation={this.props.isVariation}
            ></PostPhotos>
          </Col>
          <Col
            className="wallProductCardInfo"
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
          >
            {/* <div className="postNavBar">
              <BiStore
                onClick={() =>
                  window.location.assign(
                    `/#/StorePage/${this.props.post.account_id}`
                  )
                }
              ></BiStore>
              <AiOutlineSetting></AiOutlineSetting>
              <RiUserAddLine
                onClick={() => {
                  this.props.addToContacts(this.props.post.account_id);
                }}
              ></RiUserAddLine>
              <a
                style={{ color: "white", marginTop: "-9px" }}
                href={`tel:${""}`}
              >
                <AiOutlinePhone></AiOutlinePhone>
              </a>
              <ImWhatsapp></ImWhatsapp>
              <AiOutlineEye
                onClick={() =>
                  window.location.assign(
                    `/#/StorePage/${this.props.post.account_id}/product_page/${this.props.post.related_id}`
                  )
                }
              ></AiOutlineEye>
              <AiOutlineMessage
                onClick={() =>
                  this.props.handleOpenMessage(
                    this.props.post.account_id,
                    this.state.threadID
                  )
                }
              ></AiOutlineMessage>
            </div> */}
            {this.props.activeAccount &&
            this.props.activeAccount.account_type == 2 ? (
              <PostNavBar
                post={this.props.post}
                threadID={this.state.threadID}
                addToContacts={this.props.addToContacts}
                handleOpenMessage={this.props.handleOpenMessage}
              ></PostNavBar>
            ) : null}
            <Row>{item.name}</Row>
            <Row>
              {" "}
              {item && item.item_variations ? (
                <>
                  {" "}
                  {` מספר וריאציות : ${item.item_variations.length} `}{" "}
                  <a
                    href={`/#/StorePage/${this.props.post.account_id}/product_page/${this.props.post.related_id}`}
                  >
                    {" "}
                    &nbsp; לכל הוריאציות &nbsp;
                  </a>
                </>
              ) : null}
            </Row>{" "}
            <Row>
              {" "}
              {item.category ? `קטגוריה : ${item.category}` : null}
            </Row>{" "}
            <Row>
              {" "}
              {item.subcategory ? `תת קטגוריה : ${item.subcategory}` : null}
            </Row>{" "}
            <Row
              style={{
                height: this.state.readMore === true ? "fit-content" : "70px",
              }}
              id={`PostDescriptionRow${this.props.post.id}`}
              // className="PostDescriptionRow" + this.props.post.id
            >
              {" "}
              {item.description !== "No Description"
                ? `תיאור : ${item.description}`
                : null}
              {item.cost_per_item ? (
                <CardDiscounts
                  variation={item}
                  price={item.cost_per_item}
                ></CardDiscounts>
              ) : null}
            </Row>{" "}
            <Row>{item.batch_size ? `מנה : ${item.batch_size}` : null}</Row>
            {/* <Row> */}
            {/* {item.cost_per_item ? ` מחיר בש"ח: ${item.cost_per_item}` : null} */}
            {/* </Row> */}
            {miniVarsArr}
            <Row
              style={{ display: this.state.readMore === true ? "none" : "" }}
              className="readMore"
              onClick={this.readMore}
            >
              קרא עוד...
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}
