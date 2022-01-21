import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollButtons from "./ScrollButtons";
import { domain, isOverflown } from "./utils";
import { BiStore } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { RiUserAddLine } from "react-icons/ri";
import { AiOutlinePhone } from "react-icons/ai";
import { ImWhatsapp } from "react-icons/im";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import postPhotos from "./PostPhotos";
import PostPhotos from "./PostPhotos";

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
    axios.get(`${domain}/public-items/${itemID}/`, config).then((res) => {
      this.setState({ selectedItem: res.data });
      axios
        .get(`${domain}/public-accounts/${accountID}/`, config)
        .then((data) => {
          this.setState({ selectedAccount: data.data });
          console.log(data.data);
        });
    });
  };
  componentDidMount = () => {
    this.getThreadID(this.props.post.account_id);
    if (isOverflown("PostDescriptionRow", "y") === false) {
      this.setState({ readMore: true });
    }
    this.getPostInfo(this.props.itemID, this.props.post.account_id);
  };
  render() {
    let item = this.state.selectedItem;
    let variationsPictures =
      item && item.item_variations
        ? item.item_variations.map((variation) => {
            return (
              <img
                onClick={() => this.makeMainPic(variation.image)}
                src={variation.image}
              ></img>
            );
          })
        : null;

    console.log(this.state.selectedItem);
    return (
      <>
        <Row className="wallProductCardContainer">
          <Col st xl={6} lg={6} md={12} sm={12} xs={12}>
            <PostPhotos
              mainPicture={this.state.mainPicture}
              variationsPictures={variationsPictures}
              item={item}
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
            <div className="postNavBar">
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
            </div>
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
            <Row> {`קטגוריה : ${item.category}`}</Row>{" "}
            <Row> {`תת קטגוריה : ${item.subcategory}`}</Row>{" "}
            <Row
              style={{
                height: this.state.readMore === true ? "fit-content" : "70px",
              }}
              id="PostDescriptionRow"

              // className="PostDescriptionRow"
            >
              {" "}
              {item.description !== null ? `תיאור : ${item.description}` : null}
            </Row>{" "}
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
