import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Crop from "../components/Crop";
import AddVars from "./addVars";
import QuantityDiscount from "../components/QuantityDiscount";
import { withRouter } from "react-router-dom";
import { domain } from "../components/utils";

class ProductVaritionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      batch_size: "",
      cost_per_item: "",
      image: "",
      item: "",
      discounts: {},
      variation_key: "",
      variation_value: "",
      amount_in_stock: 0,
      responsData: "",
      priceError: "",
      variationError: "",
      ///////////
      base64: "",
      pictures: [],
      image: "",
      uploadImage: "",
      itemFormData: "",
      newBlob: "",
      varJson: "",
      varCounter: 0,
      varsInfo: "",
      discountCounter: 0,
      isOpen: false,
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      image: picture,
    });
  }
  resetPage = () => {
    this.setState({
      varCounter: 0,
      discountCounter: 0,
      cost_per_item: "",
      amount_in_stock: "",
      batch_size: "",
      discounts: {},
      newBlob: "",
      variation: "",
      IsVarButtonDisabled: false,
      IsDiscountsButtonDisabled: false,
    });
  };

  addVar = (key, value) => {
    this.setState({ varCounter: this.state.varCounter + 1 });
    this.setState({ IsVarButtonDisabled: true });
  };
  addDiscount = (key, value) => {
    this.setState({ discountCounter: this.state.discountCounter + 1 });
    console.log(this.state.discounts);
    this.setState({ IsDiscountsButtonDisabled: true });
  };
  //i want updateobj to update a state object

  updateObj = (key, value) => {
    let obj = {};
    obj[key] = value;
    console.log(obj);
    this.setState({
      varsInfo: Object.assign({}, this.state.varsInfo, { [key]: value }),
    });
    console.log(this.state.varsInfo);
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    discounts[key] = value;
    console.log(discounts);
    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
    console.log(this.state.discounts);
  };
  uploadVar = (event) => {
    let discounts = JSON.stringify(this.state.discounts);
    let string = JSON.stringify(this.state.varsInfo);
    console.log(JSON.stringify(this.state.newBlob));
    let productPost = new FormData();
    productPost.append("cost_per_item", this.state.cost_per_item);
    productPost.append("amount_in_stock", this.state.amount_in_stock);
    productPost.append("batch_size", this.state.batch_size);
    productPost.append("variation", string);
    productPost.append("discounts", discounts);
    productPost.append("description", this.state.description);
    productPost.append("item", this.props.match.params.id); //this.props.CurrentUploadItemId
    if (this.state.newBlob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: productPost });
    for (let pair of productPost.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    this.setState({ priceError: "", variationError: "" });

    axios.post(`${domain}/item-variations/`, productPost, config).then(
      (response) => {
        if (response) {
          window.location.replace("/#/");
        }
        console.log(response);
      },
      (error) => {
        if (!this.state.cost_per_item) {
          this.setState({ priceError: "this field may not be blank" });
        }
        if (this.state.cost_per_item) {
          this.setState({
            variationError:
              "this variation was allready uploaded, if you wish to upload another variation of this product please use the add variation button, fill in the variation form, and dont forget to hit the `add item` button befor you submit",
          });
        }
        console.log(error);
      }
    );
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    discounts[key] = value;
    console.log(discounts);
    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
    console.log(this.state.discounts);
  };
  uploadNRestet = (event) => {
    let discounts = JSON.stringify(this.state.discounts);
    let string = JSON.stringify(this.state.varsInfo);
    console.log(this.state.newBlob);
    console.log(JSON.stringify(this.state.newBlob));
    let productPost = new FormData();
    productPost.append("cost_per_item", this.state.cost_per_item);
    productPost.append("amount_in_stock", this.state.amount_in_stock);
    productPost.append("batch_size", this.state.batch_size);
    productPost.append("variation", string);
    productPost.append("discounts", discounts);
    productPost.append("item", this.props.CurrentUploadItemId); //this.props.CurrentUploadItemId
    if (this.state.newBlob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: productPost });
    for (let pair of productPost.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post(`${domain}/item-variations/`, productPost, config).then(
      (response) => {
        if (response) {
          this.resetPage();
        }
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getBase64 = (base64) => {
    this.setState({ newBlob: base64 });
    console.log(this.state.newBlob);
    const getInfo = (image) => {
      this.setState({ uploadImage: image });
    };
    let reader = new FileReader();
    reader.readAsDataURL(base64);
    reader.onloadend = function () {
      let base64data = reader.result;
      getInfo(base64data);
    };
  };

  getCropedBlob = (blob) => {
    this.setState({ pictures: blob });
  };

  // {
  //   "id": 0, !!!!!!!!!
  //   "cost_per_item": 0,
  //   "batch_size": 0,
  //   "amount_in_stock": 0,
  //   "variation": {},
  //   "discounts": {},
  //   "image": "string",
  //   "item": 0
  // }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let card =
      this.props.screenWidth > 580 ? (
        <ProductCard pictures={this.state.pictures}></ProductCard>
      ) : (
        <ProductCard pictures={this.state.pictures}></ProductCard>
      );
    let varform = [];
    let discounts = [];
    for (let i = 0; i < this.state.varCounter; i++) {
      varform.push(
        <AddVars
          varCounter={this.state.varCounter}
          addVar={this.addVar}
          updateObj={this.updateObj}
        ></AddVars>
      );
    }

    for (let i = 0; i < this.state.discountCounter; i++) {
      discounts.push(
        <QuantityDiscount
          updateDiscounts={this.updateDiscounts}
          discountCounter={this.state.discountCounter}
          addDiscount={this.addDiscount}
        ></QuantityDiscount>
      );
    }
    return (
      <div className="Uploadpage">
        <Container className="productUploadContainer">
          <Form className="varUploadForm">
            <Row>
              <Col xl={6} sm={12}>
                <Crop
                  className="cropper"
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Col>
              <Col xl={6}>
                {card}
                <p className="FormRejects"> {this.state.responsData.image}</p>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>var description (needs a backend)</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="textarea"
                rows={3}
                value={this.state.description}
                placeholder="enter description here..."
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>batch size</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="batch size"
                value={this.state.batch_size}
                name="batch_size"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>in stock</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="stock"
                value={this.state.amount_in_stock}
                name="amount_in_stock"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>price</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="unit price"
                value={this.state.cost_per_item}
                name="cost_per_item"
              />
              <p className="FormRejects">{this.state.priceError}</p>
            </Form.Group>

            <Row style={{ padding: "0px 20px 0px 20px" }}>
              <Button
                onClick={this.addVar}
                type="button"
                variant="success"
                disabled={this.state.IsVarButtonDisabled}
              >
                add variation
              </Button>
              <p className="FormRejects">{this.state.variationError}</p>
              <Row>
                {" "}
                <Col xl={12}>{varform}</Col>
              </Row>
              {/* <Col xl={2}> */}
              <Row></Row>
              <Button
                onClick={this.addDiscount}
                type="button"
                variant="success"
                disabled={this.state.IsDiscountsButtonDisabled}
              >
                add discount
              </Button>
              {/* </Col> */}
            </Row>

            <Row>
              <Col xl={12}>{discounts}</Col>
            </Row>

            <Row>
              <Col xl={7}>
                <Button type="button" onClick={this.uploadNRestet}>
                  submit and upload another variation of this item
                </Button>
              </Col>
              <Col xl={3}>
                <Button type="button" onClick={this.uploadVar}>
                  submit
                </Button>
              </Col>
              <Col xl={2}>
                <Button type="button" variant="danger" onClick={this.resetPage}>
                  reset form
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(ProductVaritionPage);
