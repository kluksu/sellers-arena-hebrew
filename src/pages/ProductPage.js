import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { domain, getData, postData } from "../components/utils";
import { Col, NavLink, Row, Form, FormLabel, Button } from "react-bootstrap";
import MyCarousl from "../components/MyCarousl";
import ProductPageVariationInfo from "../components/ProductPageVariationInfo";
import axios from "axios";
import FullPageLoader from "../components/FullPageLoader";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variations: [],
      itemData: "",
      selectedVariationID: null,
      selectedVariation: "",
      activeCart: "",
      units: 0,
      notice: "",
    };
  }
  addCartItems = (cartID, itemID, quantity) => {
    return postData(
      `${domain}/cart/${cartID}/add/`,
      {
        item_variation_id: itemID,
        quantity: quantity,
      },
      ` ${this.props.accessToken}`
    );
  };
  creatCart = () => {
    return postData(
      `${domain}/cart/`,
      {
        buyer_account: this.props.activeAccount.id,
        seller_account: this.props.match.params.storeId,
      },
      ` ${this.props.accessToken}`
    );
  };
  addItemsToCart = (cartID, itemID, quantity) => {
    if (
      this.props.activeAccount.account_type == 2 &&
      this.state.activeCart === ""
    ) {
      this.creatCart()
        .then((res) => {
          this.setState({ activeCart: res });
          this.addCartItems(res.id, itemID, quantity).then(() => {
            this.props.openGenericModal("הפריט נוסף בהצלחה לעגלת הקניות");
            this.props.getCarts();
          });
        })
        .catch((res) => {
          this.props.openGenericModal("אופס", "ישנה תקלה, נסה שנית מאוחר יותר");
        });
    } else {
      this.addCartItems(cartID, itemID, quantity).then((res) => {
        if (!res.error) {
          this.props.openGenericModal("הפריט נוסף בהצלחה לעגלת הקניות");
          this.props.getCarts();
        }

        if (res.error) {
          let obj = { variations_json: { [itemID]: quantity } };
          return postData(
            `${domain}/cart/${cartID}/edit/`,
            obj,
            ` ${this.props.accessToken}`
          ).then((res) => {
            this.props.openGenericModal("הפריט נוסף בהצלחה לעגלת הקניות");

            this.props.getCarts();
          });
        }
      });
    }
  };
  keepBatch = (event) => {
    this.setState({ units: event.target.value });
    let firstValue = event.target.value;
    if (
      event.target.value !== this.state.units &&
      event.target.value % this.state.selectedVariation.batch_size !== 0
    ) {
      setTimeout(() => {
        let sum =
          Math.floor(
            event.target.value / this.state.selectedVariation.batch_size
          ) * this.state.selectedVariation.batch_size;
        this.setState({ units: sum });
        if (
          (firstValue / this.state.selectedVariation.batch_size) *
            this.state.selectedVariation.batch_size -
            sum !==
          0
        ) {
          this.setState({
            notice: `${Math.floor(
              (firstValue / this.state.selectedVariation.batch_size) *
                this.state.selectedVariation.batch_size -
                sum
            )}
           units where removed (batch size is ${
             this.state.selectedVariation.batch_size
           })`,
          });
        } else {
          this.setState({ notice: "" });
        }
      }, 3500);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
  };
  // componentDidMount(){
  //     this.setState({units:this.props.value})
  // }
  //     componentDidUpdate(prevProps,prevState){
  //        if(this.state.units!==prevState.units && this.props.getCartProducts){
  //            this.props.getCartProducts(this.props.variation.id, this.state.units)

  //        }
  //    }

  addQuantity = () => {
    if (this.state.selectedVariation.batch_size) {
      this.setState({
        units:
          this.state.units + parseInt(this.state.selectedVariation.batch_size),
      });
    }
  };
  decreaseQuantity = () => {
    if (this.state.selectedVariation.batch_size && this.state.units > 0) {
      this.setState({
        units:
          this.state.units - parseInt(this.state.selectedVariation.batch_size),
      });
    }
  };

  pickVariation = (id) => {
    window.scrollTo(0, 150);
    this.setState({ selectedVariationID: id });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getItem = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(
        `${domain}/public-items/${this.props.match.params.productId}/`,
        config
      )
      .then((res) => {
        this.setState({ itemData: res.data });
        this.setState({ variations: res.data.item_variations });
      });
  };
  componentDidMount() {
    if (
      this.props.activeAccount &&
      this.props.activeAccount.account_type == 3
    ) {
      this.setState({ activeCart: this.props.activeCart });
    }
    if (this.props.MyShoppingCarts) {
      this.props.MyShoppingCarts.forEach((cart) => {
        if (
          this.props.activeAccount.account_type == 2 &&
          cart.seller_account == this.props.match.params.storeId
        ) {
          this.setState({ activeCart: cart });
        }
      });
      this.getItem();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.accessToken !== prevProps.accessToken) {
      this.getItem();
    }
    if (this.props.activeCart.id !== prevProps.activeCart.id) {
      {
        this.setState({ activeCart: this.props.activeCart });
      }
    }
    if (
      this.state.selectedVariation.id !== prevState.selectedVariation.id &&
      this.state.activeCart !== {} &&
      this.state.activeCart !== undefined &&
      this.state.activeCart !== "" &&
      this.state.activeCart.all_item_variations
    ) {
      this.setState({ units: 0 });

      this.state.activeCart.all_item_variations.forEach((variation) => {
        if (variation.item_variation.id == this.state.selectedVariation.id) {
          this.setState({ units: variation.quantity });
        }
      });
    }
    if (this.state.selectedVariationID !== prevState.selectedVariationID) {
      this.state.variations.forEach((variation) => {
        if (variation.id == this.state.selectedVariationID) {
          this.setState({ selectedVariation: variation });
        }
      });
    }
    if (
      (this.props.MyShoppingCarts &&
        this.props.match.params.storeId !== prevProps.match.params.storeId) ||
      this.props.MyShoppingCarts !== prevProps.MyShoppingCarts
    ) {
      this.props.MyShoppingCarts.forEach((cart) => {
        if (
          this.props.activeAccount.account_type == 2 &&
          cart.seller_account == this.props.match.params.storeId
        ) {
          this.setState({ activeCart: cart });
        }
      });
    }
  }
  render() {
    let buttons = this.props.activeAccount ? (
      <>
        <div className="CardUnitsForm">
          <Button
            type="button"
            variant="primary"
            onClick={this.decreaseQuantity}
          >
            -
          </Button>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                onChange={this.keepBatch}
                type="text"
                placeholder={this.state.units}
                value={this.state.units}
                name="units"
              />
            </Form.Group>
          </Form>
          <Button type="button" variant="primary" onClick={this.addQuantity}>
            +
          </Button>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            this.addItemsToCart(
              this.state.activeCart.id,
              this.state.selectedVariationID,
              this.state.units
            );
          }}
        >
          {" "}
          הוסף לעגלה
        </Button>
      </>
    ) : null;

    let headline =
      this.state.activeCart !== "" ? (
        <h1 className="productPageHeadLine">
          {this.state.activeCart.buyer_account} הוסף לעגלה של
        </h1>
      ) : null;

    let selectedVariationInfo =
      this.state.selectedVariationID !== null ? (
        <ProductPageVariationInfo
          pickVariation={this.pickVariation}
          variation={
            this.state.selectedVariation !== undefined
              ? this.state.selectedVariation
              : {}
          }
          item={this.state.itemData}
        ></ProductPageVariationInfo>
      ) : null;

    let variationsGallry = [];
    let variationOptionsArr = [];
    let variations =
      this.state.variations !== undefined ? this.state.variations : [];
    variations.forEach((variation) => {
      variationOptionsArr.push(
        <option
          value={variation.id}
          data-img_src={`${
            variation.image !== null
              ? variation.image
              : this.state.itemData.image
          }`}
        >
          {variation.id}{" "}
        </option>
      );
      variationsGallry.push(
        <ProductPageVariationInfo
          pickVariation={this.pickVariation}
          variation={variation}
          item={this.state.itemData}
        ></ProductPageVariationInfo>
      );
    });
    return (
      <div className="productPageContainer">
        <Row>{headline}</Row>
        <Row>
          <Col xl={6} sm={12}>
            <div>
              <div className="productPageUpperInfo">
                <Row className="prodauctPageUpperInfo">
                  <h4>{this.state.itemData.name}</h4>
                </Row>
                <Row>
                  <div>קטגוריה: {this.state.itemData.category}</div>
                </Row>
                <Row>
                  <span>קטגוריה משנית: {this.state.itemData.subcategory}</span>
                </Row>
                <Row>
                  <span>קוד מוצר: {this.state.itemData.id}</span>
                </Row>
                <Row>
                  <div>תיאור: {this.state.itemData.description}</div>
                </Row>
              </div>
              <Form.Group>
                <FormLabel>בחר וריאציה</FormLabel>
                <Form.Control
                  onChange={this.handleChange}
                  size="md"
                  as="select"
                  name="selectedVariationID"
                >
                  <option>-----------</option>
                  {variationOptionsArr}
                </Form.Control>
              </Form.Group>
              {selectedVariationInfo}
              <p className="FormRejects absoluteCardNotice">
                {this.state.notice}
              </p>

              <div className="CardUnitsFormContainer">{buttons}</div>
            </div>
          </Col>

          <Col xl={6} xs={12}>
            <div>
              <MyCarousl
                item={this.state.itemData}
                selectedVariationID={this.state.selectedVariationID}
                variations={variations}
              ></MyCarousl>
            </div>
          </Col>
        </Row>
        <Row className="productPageVariationsGallry">{variationsGallry}</Row>
      </div>
    );
  }
}
export default withRouter(ProductPage);
