import axios from "axios";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import ScrollButtons from "./ScrollButtons";
import { domain, isOverflown } from "./utils";

import PostPhotos from "./PostPhotos";
import PostNavBar from "./PostNavBar";
import CardDiscounts from "./CardDiscounts";
import ProductModal from "./ProductModal";

export default class WallProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      selectedAccount: {},
      mainPicture: "",
      readMore: false,
      threadID: "",
      fullItem: {},
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
    if (
      this.state.selectedItem !== prevState.selectedItem &&
      this.props.isVariation === true
    ) {
      const authorization = !this.props.accessToken
        ? null
        : `Bearer ${this.props.accessToken}`;
      const config = {
        headers: { "Content-Type": "application/json", authorization },
      };
      axios
        .get(
          `${domain}/${"public-items"}/${this.state.selectedItem.item}/`,
          config
        )
        .then((res) => {
          this.setState({ fullItem: res.data });
        });
    }
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
          this.props.isVariation === true
            ? this.props.activeAccount.account_type == 3
              ? "item-variations"
              : "public-item-variations"
            : "public-items"
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
    let item =
      this.props.isVariation === true
        ? this.state.fullItem
        : this.state.selectedItem; //can be a variation or an item
    let variation =
      this.props.isVariation === true ? this.state.selectedItem : null; //can be only an ite
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
    let discountNumOnly = this.props.discountPrecentage
      ? this.props.discountPrecentage.slice(
          0,
          this.props.discountPrecentage.length - 1
        )
      : "";

    let oldPrice = this.props.discountPrecentage
      ? (variation.cost_per_item * 100) / (100 - discountNumOnly)
      : "";
    console.log(item);
    return (
      <>
        <Row className="wallProductCardContainer">
          <Col st xl={6} lg={6} md={12} sm={12} xs={12}>
            <PostPhotos
              // discounts={
              //   variation && variation.discounts ? variation.discounts : ""
              // }
              discountPrecentage={
                this.props.discountPrecentage
                  ? this.props.discountPrecentage
                  : ""
              }
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
            <Row>{item.name}</Row>
            <Row>
              {" "}
              {item && item.item_variations ? (
                <>
                  {" "}
                  {` מספר וריאציות : ${item.item_variations.length} `}{" "}
                  <a
                    href={window.location.href}
                    onClick={() =>
                      this.props.openGenericModal(
                        "",
                        <ProductModal
                          selectedVariation={variation}
                          // cartItems={this.props.cartItems}
                          // accessToken={this.props.accessToken}
                          // activeCart={this.props.activeCart}
                          // getCartProducts={this.props.getCartProducts}
                          item={item}
                          activeAccount={this.props.activeAccount}
                          accessToken={this.props.accessToken}
                          // buttons={buttons}
                        ></ProductModal>,
                        <>
                          {" "}
                          {window.location.href.includes("StorePage")
                            ? // <Button onClick={this.props.addCartItems} variant="success">
                              //   הוסף לעגלה
                              // </Button>
                              ""
                            : ""}
                        </>,
                        "",
                        "modal90W"
                      )
                    }
                  >
                    {" "}
                    &nbsp; לכל הוריאציות &nbsp;
                  </a>
                </>
              ) : null}
            </Row>{" "}
            <Row> {item.category ? `קטגוריה : ${item.category}` : ""}</Row>{" "}
            <Row>
              {" "}
              {item.subcategory ? `תת קטגוריה : ${item.subcategory}` : null}
            </Row>{" "}
            {oldPrice ? (
              <Row>
                <span>מחיר לפני הוזלה: </span>

                <span className="oldPrice">
                  {" "}
                  {Math.round(oldPrice * 10) / 10} ש"ח
                </span>
              </Row>
            ) : (
              ""
            )}
            <Row
              style={{
                height:
                  this.state.readMore === true ? "fit-content" : "fit-content",
              }}
              id={`PostDescriptionRow${this.props.post.id}`}
              // className="PostDescriptionRow" + this.props.post.id
            >
              {" "}
              {item.description !== "No Description"
                ? `תיאור : ${item.description}`
                : null}
            </Row>{" "}
            <Row>
              מחיר:
              {variation && variation.cost_per_item ? (
                <CardDiscounts
                  variation={variation}
                  price={variation.cost_per_item}
                ></CardDiscounts>
              ) : null}
            </Row>
            <Row>
              {variation && variation.batch_size
                ? `מנה : ${variation.batch_size}`
                : null}
            </Row>
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
          {this.props.activeAccount &&
          this.props.activeAccount.account_type == 2 ? (
            <PostNavBar
              closeGenericModal={this.props.closeGenericModal}
              openGenericModal={this.props.openGenericModal}
              post={this.props.post}
              threadID={this.state.threadID}
              addToContacts={this.props.addToContacts}
              handleOpenMessage={this.props.handleOpenMessage}
            ></PostNavBar>
          ) : null}
        </Row>
      </>
    );
  }
}
