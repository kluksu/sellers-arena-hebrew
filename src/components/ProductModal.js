import axios from "axios";
import { values } from "lodash";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import CardDiscounts from "./CardDiscounts";
import PostPhotos from "./PostPhotos";
import ProductPageVariationInfo from "./ProductPageVariationInfo";
import QuantitySelector from "./QuantitySelector";
import { domain } from "./utils";

export default class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variations: [],
      selectedVariation: {},
      quantity: 0,
      discoutns: {},
    };
  }
  getStateValue = (state, value) => {
    this.setState({ [state]: value });
  };
  getItemOrderDits = async (varID) => {
    if (
      this.props.cartItems &&
      typeof this.props.cartItems[varID] === "number"
      //   this.props.cartItems[varID] == 0
      //   this.props.cartItems[varID] != 0
    ) {
      this.setState({ quantity: this.props.cartItems[varID] });
    } else {
      this.setState({ quantity: 0 });

      if (this.props.activeCart) {
        this.props.activeCart.all_item_variations.forEach((variation) => {
          this.setState({
            discoutns: variation.item_variation.discoutns,
          });
        });
      }
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.cartItems &&
      this.props.cartItems[this.state.selectedVariation.id] !==
        prevProps.cartItems[this.state.selectedVariation.id]
    ) {
      this.setState({
        quantity: this.props.cartItems[this.state.selectedVariation.id],
      });
    }
    if (this.state.quantity !== prevState.quantity) {
    }
    if (this.state.selectedVariation !== prevState.selectedVariation) {
      this.getItemOrderDits(this.state.selectedVariation.id);
    }

    if (this.state.variations !== prevState.variations) {
      this.setState({ selectedVariation: this.state.variations[0] });
    }
  };
  //   getItem = () => {
  //     const authorization = !this.props.accessToken
  //       ? null
  //       : `Bearer ${this.props.accessToken}`;
  //     const config = {
  //       headers: { "Content-Type": "application/json", authorization },
  //     };
  //     axios
  //       .get(`${domain}/public-items/${this.props.item.id}/`, config)
  //       .then((res) => {
  //         this.setState({ item: res.data });
  //         this.setState({ variations: res.data.item_variations });
  //       });
  //   };
  componentDidMount() {
    // this.props.item.item_variations.forEach((variation) => {
    //   if (!this.props.cartItems[variation.id]) {
    //     // this.props.getCartProducts(variation.id, 5);
    //     // this.props.getCartProducts(variation.id, 0);
    //   }
    // });
    //
    // this.getItem();
    //
    this.setState({ variations: this.props.item.item_variations });
    this.setState({ selectedVariation: this.props.item.item_variations[0] });
  }
  render() {
    //
    //
    let itemVariations = [];
    if (
      this.state.selectedVariation &&
      this.state.selectedVariation.variation &&
      Object.keys(this.state.selectedVariation).length > 0 &&
      Object.keys(this.state.selectedVariation.variation).length > 0
    ) {
      Object.entries(this.state.selectedVariation.variation).forEach(
        (variation) => {
          itemVariations.push(<Row>{`${variation[0]} : ${variation[1]}`}</Row>);
        }
      );
    }

    let mainImage = this.state.selectedVariation.image
      ? this.state.selectedVariation.image
      : this.props.item.image;
    let allItemsImages = this.state.variations.map((variation) => {
      return (
        <img
          style={{
            border:
              this.state.selectedVariation.image == variation.image
                ? "5px solid rebeccapurple"
                : "",
          }}
          onClick={() => this.setState({ selectedVariation: variation })}
          src={variation.image ? variation.image : this.props.item.image}
        ></img>
      );
    });
    let buttons =
      !this.props.linkAllAround &&
      this.props.activeAccount &&
      window.location.href.includes("StorePage") ? (
        <>
          <QuantitySelector
            cartItems={this.props.cartItems}
            activeCart={this.props.activeCart}
            item={this.props.item}
            accessToken={this.props.accessToken}
            getStateValue={this.getStateValue}
            activeAccount={this.props.activeAccount}
            getCartProducts={this.props.getCartProducts}
            variation={this.state.selectedVariation}
            value={this.state.quantity}
            getNotice={this.getNotice}
          ></QuantitySelector>
        </>
      ) : null;
    return (
      <Row className="productModal">
        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="productModalPic">
          <PostPhotos
            selectedVariation={this.state.selectedVariation}
            mainPicture={mainImage}
            variationsPictures={allItemsImages}
            item={this.props.item}
            post={this.props.item}
            isVariation={this.props.isVariation}
          ></PostPhotos>

          {Object.keys(this.state.selectedVariation).length !== 0 ? (
            <CardDiscounts
              onClick={(e) => {}}
              variation={this.state.selectedVariation}
              price={
                this.state.selectedVariation
                  ? this.state.selectedVariation.cost_per_item
                  : ""
              }
            ></CardDiscounts>
          ) : (
            ""
          )}

          {/* {this.props.selectedVariationDiscount} */}
          {/* <img src={mainImage}></img>
          <div>{allItemsImages}</div>*/}
        </Col>

        <Col xl={6} lg={6} md={12} sm={12} xs={12} className="Info">
          <div className="productPageUpperInfo">
            <div>
              <Row className="prodauctPageUpperInfo">
                <h4>{this.props.item.name}</h4>
              </Row>
              <Row>
                <div>קטגוריה: {this.props.item.category}</div>
              </Row>
              <Row>
                <span>קטגוריה משנית: {this.props.item.subcategory}</span>
              </Row>
              <Row>
                <span>קוד מוצר: {this.props.item.id}</span>
              </Row>
              <Row>
                <div>תיאור: {this.props.item.description}</div>
              </Row>
              <Row>
                <div> קוד דגם: {this.state.selectedVariation.id}</div>
              </Row>{" "}
              <Row>
                <div> כמות מנה: {this.state.selectedVariation.batch_size}</div>
              </Row>{" "}
              <Row>
                <div>
                  מלאי:{" "}
                  {this.state.selectedVariation.is_in_stock
                    ? this.state.selectedVariation.is_in_stock
                    : this.state.selectedVariation.amount_in_stock}
                </div>
              </Row>{" "}
              {itemVariations}
            </div>
            <div>{buttons}</div>
          </div>
        </Col>
      </Row>
    );
  }
}
