import React, { Component } from "react";
import { Col, NavLink, Row, Button, Form } from "react-bootstrap";
import { ImEyePlus, ImFeed } from "react-icons/im";
import { IoStorefrontOutline } from "react-icons/io5";

import { HashRouter, Route, Router, withRouter } from "react-router-dom";
import { NIL } from "uuid";
import InfoBox from "../components/InfoBox";
import StorePage from "../pages/StorePage";
import CardDiscounts from "./CardDiscounts";
import ProductModal from "./ProductModal";
import QuantitySelector from "./QuantitySelector";
import SpacielOffer from "./SpacielOffer";
import preventDoubleTapZoom, { domain, getRandomNumberBetween } from "./utils";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: "",
    };
  }
  openProductModal = (buttons) => {
    this.props.openGenericModal(
      "",
      <ProductModal
        selectedVariation={this.props.variation}
        cartItems={this.props.cartItems}
        accessToken={this.props.accessToken}
        activeCart={this.props.activeCart}
        getCartProducts={this.props.getCartProducts}
        item={this.props.item}
        activeAccount={this.props.activeAccount}
        accessToken={this.props.accessToken}
        buttons={buttons}
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
    );
  };
  getNotice = (notice) => {
    this.setState({ notice: notice });
  };
  render() {
    //
    //not sure
    let cardZoom = this.props.screenWidth > 1200 ? "" : "scale(1)";
    //not sure
    // let discountsArr = [];
    // let prev = 0;
    // let price = 0;
    // let lastKey = 0;
    // let lastPrice = 0;
    // let discountClass = "productCardDiscounts";

    // if (this.props.variation) {
    //   let discounts = this.props.variation.discounts;
    //   discounts["0"] = 0;
    //   if (Object.keys(discounts).length > 1) {
    //     for (const [key, value] of Object.entries(discounts)) {
    //       discountClass = "productCardDiscounts";
    //       if (key == 0) {
    //         price = this.props.price * (1 - value);
    //         continue;
    //       }
    //       discountsArr.push(
    //         <span className="borderRight">
    //           <div>
    //             {prev}-{key} יחידות{" "}
    //           </div>{" "}
    //           <div>{price}₪</div>{" "}
    //         </span>
    //       );
    //       price = this.props.price * (1 - value);
    //       lastKey = key;
    //       lastPrice = price;
    //       if (key > prev) {
    //         prev = key;
    //       }
    //     }

    //     discountsArr.push(
    //       <span>
    //         <div>{`>=${lastKey} יחידות`}</div>
    //         <div>{`${lastPrice}₪`}</div>
    //       </span>
    //     );
    //   } else {
    //     discountsArr.push(<div>{`${this.props.price}₪ ליחידה`} </div>);
    //   }
    // }
    let buttons =
      !this.props.linkAllAround && this.props.activeAccount ? (
        <>
          <QuantitySelector
            cartItems={this.props.cartItems}
            activeAccount={this.props.activeAccount}
            getCartProducts={this.props.getCartProducts}
            variation={this.props.variation}
            value={this.props.value}
            getNotice={this.getNotice}
          ></QuantitySelector>
        </>
      ) : null;

    ////make product name shortName, couses bug if name is longer then card right now.
    const picture =
      this.props.pictures !== null
        ? this.props.pictures
        : domain.includes("heroku")
        ? `https://picsum.photos/300/300?random=${getRandomNumberBetween(
            1,
            20000
          )}`
        : this.props.item.image;
    const storeLInksAcive = this.props.linkAllAround;
    const batchSize = this.props.variation ? (
      <div>כמות מנה {this.props.variation.batch_size}</div>
    ) : null;

    if (this.props.type == 10) {
      return (
        <Col
          onSubmit={(event) => event.preventDefault()}
          xl={2}
          lg={4}
          className={`productCardContainer  zoomCard ${cardZoom} ${this.props.extraClassName}`}
          style={{ transform: cardZoom }}
        >
          <NavLink
            href={this.props.linkAllAround}
            className={`productCardContainer`}
          >
            <Row>
              <Col xs={6}>
                <p className="FormRejects absoluteCardNotice">
                  {this.state.notice}
                </p>

                <NavLink src="">לחנות</NavLink>
              </Col>
              <Col xs={6}>
                {" "}
                <NavLink
                  onClick={() =>
                    window.location.assign(this.props.productInfoLink)
                  }
                >
                  למוצר
                </NavLink>
              </Col>
            </Row>

            <div className="imageContainer">
              <img src={picture} alt="no picture" />
            </div>
            <div className="cardInfo">i</div>
            <InfoBox
              variation={this.props.variation}
              item={this.props.item}
            ></InfoBox>
            <div> {this.props.supplier}</div>
          </NavLink>
        </Col>
      );
    } else {
      return (
        <div
          onTouchStart={preventDoubleTapZoom}
          className={`type2card   zoomCard ${cardZoom}`}
          style={{ transform: cardZoom }}
        >
          {/* <div
            // onClick={(e) => e.stopPropagation()}
            // href={this.props.linkAllAround}
            className={`type2card`}
          > */}
          <div
            onClick={(e) => {
              if (this.props.linkAllAround) {
                this.props.openGenericModal(<img src={picture}></img>);
              }
            }}
            className="type2cardImage"
          >
            <div
              onClick={(e) => {
                e.stopPropagation(e);
              }}
              className="cardEyeIcon"
            >
              <span className="cardInfo">i </span>
              <InfoBox
                link={
                  // <div
                  //   style={{ fontSize: "20px" }}
                  //   onClick={
                  //     window.location.href.includes("storePage")
                  //       ? () =>
                  //           this.props.openGenericModal(
                  //             "שים לב!",
                  //             "לא שמרת את הפריטים בעגלה, אם תעבור עמוד המידע שלא נשמר ימחק",
                  //             <>
                  //               <Button
                  //                 type="button"
                  //                 onClick={() => {
                  //                   this.props.closeGenericModal();
                  //                   this.props.addCartItems();
                  //                 }}
                  //               >
                  //                 שמור את המוצרים
                  //               </Button>
                  //               <Button
                  //                 type="button"
                  //                 variant="warning"
                  //                 onClick={() => {
                  //                   this.props.closeGenericModal();
                  //                   window.location.assign(
                  //                     this.props.productInfoLink
                  //                   );
                  //                 }}
                  //               >
                  //                 המשך ללא שמירה
                  //               </Button>
                  //             </>
                  //           )
                  //       : () =>
                  //           this.props.openGenericModal(
                  //             "",
                  //             <ProductModal
                  //               cartItems={this.props.cartItems}
                  //               accessToken={this.props.accessToken}
                  //               activeCart={this.props.activeCart}
                  //               getCartProducts={this.props.getCartProducts}
                  //               item={this.props.item}
                  //               activeAccount={this.props.activeAccount}
                  //               accessToken={this.props.accessToken}
                  //               buttons={
                  //                 <span className="CardUnitsFormContainer">
                  //                   {buttons}
                  //                 </span>
                  //               }
                  //             ></ProductModal>,
                  //             <>
                  //               {" "}
                  //               <Button
                  //                 onClick={this.props.addCartItems}
                  //                 variant="success"
                  //               >
                  //                 הוסף לעגלה
                  //               </Button>
                  //             </>,
                  //             "",
                  //             "modal90W"
                  //           )

                  //     // window.location.assign(this.props.productInfoLink)
                  //   }
                  //   // onClick={async (e) => {
                  //   //   await this.props.addCartItems();
                  //   //   window.location.assign(this.props.productInfoLink);
                  //   // }}
                  // >
                  //   למוצר
                  // </div>
                  ""
                }
                variation={this.props.variation}
                item={this.props.item}
              ></InfoBox>
              {/* <ImEyePlus
                onClick={(e) => {
                  e.stopPropagation(e);
                  this.openProductModal(buttons);
                }}
              ></ImEyePlus> */}
            </div>
            {this.props.variation ? (
              <>
                <div className="centered45">
                  {this.props.variation.is_in_stock === false ||
                  (this.props.activeAccount &&
                    this.props.variation.amount_in_stock < 1)
                    ? "מלאי חסר"
                    : null}
                </div>
                {this.props.variation.is_in_stock !== false ||
                (this.props.activeAccount &&
                  this.props.variation.amount_in_stock) >= 1 ? (
                  <div className="centered45" style={{ fontSize: "20px" }}>
                    {!picture ? "אין תמונה" : null}
                  </div>
                ) : null}
              </>
            ) : null}

            <img
              // onClick={window.location.assign(this.props.linkAllAround)}
              style={{
                opacity:
                  (this.props.variation &&
                    this.props.variation.is_in_stock === false) ||
                  (this.props.activeAccount &&
                    this.props.variation.amount_in_stock < 1) ||
                  !picture
                    ? 0.5
                    : null,
              }}
              className="zoomCardImg"
              src={
                picture
                  ? picture
                  : "https://cdn.pixabay.com/photo/2016/11/29/08/42/frame-1868498_960_720.jpg"
              }
              alt="no picture"
            />
          </div>
          <CardDiscounts
            // onClick={(e) => {
            //   if (this.props.linkAllAround) {
            //     window.location.assign(this.props.linkAllAround);
            //   }
            // }}
            variation={this.props.variation}
            price={this.props.price}
          ></CardDiscounts>
          <div className="lowerProductCard">
            <div className="infoAndButtons">
              <span> {this.props.productName}</span>{" "}
              <span>
                {" "}
                {!window.location.href.includes("StorePage") ? (
                  <>
                    <IoStorefrontOutline
                      className="cardStoreIcon"
                      style={{ marginLeft: "10px" }}
                      onClick={(e) => {
                        if (this.props.linkAllAround) {
                          window.location.assign(this.props.linkAllAround);
                        }
                      }}
                    ></IoStorefrontOutline>
                    <div className="hoverDescription"> כנס לחנות של הספק</div>
                  </>
                ) : (
                  ""
                )}
                <ImEyePlus
                  className="cardSeeMore"
                  onClick={(e) => {
                    e.stopPropagation(e);
                    this.openProductModal(buttons);
                  }}
                ></ImEyePlus>
                <div className="hoverDescription">ראה פירוט</div>
                {/* {console.log(this.props.item)} */}
                {!this.props.activeAccount || this.props.activeAccount ? (
                  <>
                    {" "}
                    {!this.props.activeAccount ||
                    this.props.activeAccount.account_type !== 3 ? (
                      <ImFeed
                        className="cardFeedIcon"
                        onClick={(e) => {
                          e.stopPropagation(e);
                          window.location.assign(
                            `/#/supplier-feed/${this.props.item.account}`
                          );
                        }}
                      ></ImFeed>
                    ) : (
                      ""
                    )}
                    <div className="hoverDescription extra"> עדכוני ספק</div>
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
            {/* <div>{`${this.props.price} ${this.props.currency}`}</div> */}
            <div className="cardBatchSize">
              {batchSize}
              <span>
                {/* <ImEyePlus
                  onClick={() => this.openProductModal(buttons)}
                ></ImEyePlus> */}
              </span>
            </div>
          </div>
          <span className="CardUnitsFormContainer">{buttons}</span>

          <div
            style={{ width: "100%", height: "100%" }}
            onClick={(e) => {
              if (this.props.linkAllAround) {
                window.location.assign(this.props.linkAllAround);
              }
            }}
          ></div>
          {/* <p className="FormRejects absoluteCardNotice">
              {this.state.notice}
            </p> */}
          {this.props.variation &&
          // this.props.activeAccount &&
          // this.props.activeAccount.account_type == 2 &&
          Object.keys(this.props.variation.discounts).length > 1 ? (
            <SpacielOffer></SpacielOffer>
          ) : (
            ""
          )}
        </div>
        // </div>
      );
    }
  }
}
export default withRouter(ProductCard);
