import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Crop from "../components/Crop";
import AddVars from "./addVars";
import QuantityDiscount from "../components/QuantityDiscount";
import { withRouter } from "react-router-dom";
import { domain } from "../components/utils";

class EditVariationPage extends React.Component {
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
      ///////////
      base64: "",
      pictures: "",
      image: "",
      uploadImage: "",
      itemFormData: "",
      newBlob: "",
      varJson: "",
      varCounter: 0,
      varsInfo: "",
      discountCounter: 0,
      isOpen: false,
      selectedVariationDits: "",
      newDIscount: "",
      newVariations: "",
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      image: picture,
    });
  }
  deleteInnerVariation = (key) => {
    let obj = this.state.newVariations;
    delete obj[key];
    this.setState({ newVariations: obj });
  };
  deletDiscount = (key) => {
    let obj = this.state.newDIscount;
    delete obj[key];
    this.setState({ newDIscount: obj });
  };

  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`${domain}/item-variations/${this.props.match.params.id}`, config)
      .then((response) => {
        this.setState({ selectedVariationDits: response.data });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedVariationDits !== prevState.selectedVariationDits) {
      this.setState({
        newDIscount: this.state.selectedVariationDits.discounts,
      });
      this.setState({
        newVariations: this.state.selectedVariationDits.variation,
      });

      let res = this.state.selectedVariationDits;
      this.setState({
        item: res.item,
        cost_per_item: res.cost_per_item,
        batch_size: res.batch_size,
        amount_in_stock: res.amount_in_stock,
        discounts: res.discounts,
        description: res.description,
        varsInfo: res.variation,
        id: this.props.match.params.id,
      });
    }
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
      isDiscountButtonActive: false,
      isVarButtonActive: false,
    });
  };

  addVar = (key, value) => {
    this.setState({ varCounter: this.state.varCounter + 1 });
    this.setState({ isVarButtonActive: true });
  };
  addDiscount = (key, value) => {
    this.setState({ discountCounter: this.state.discountCounter + 1 });
    this.setState({ isDiscountButtonActive: true });
  };
  //i want updateobj to update a state object

  updateObj = (key, value) => {
    let obj = {};
    obj[key] = value;
    this.setState({
      varsInfo: Object.assign({}, this.state.varsInfo, { [key]: value }),
    });
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    discounts[key] = value;
    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
    console.log(this.state.newDIscount);
  };
  uploadVar = (event) => {
    // this.setState({discounts: Object.assign(  this.state.newDIscount)} )
    this.setState({
      varsInfo: Object.assign(Object.entries(this.state.newVariations)),
    });

    let discounts = JSON.stringify(this.state.discounts);
    let string = JSON.stringify(this.state.varsInfo);
    let productPost = new FormData();
    productPost.append("cost_per_item", this.state.cost_per_item);
    productPost.append("amount_in_stock", this.state.amount_in_stock);
    productPost.append("batch_size", this.state.batch_size);
    productPost.append("variation", string);
    productPost.append("description", this.state.description);
    productPost.append("discounts", discounts);
    productPost.append("item", this.state.item); //this.props.CurrentUploadItemId
    if (this.state.newBlob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: productPost });

    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .patch(
        `${domain}/item-variations/${this.props.match.params.id}/`,
        productPost,
        config
      )
      .then(
        (response) => {
          if (response.status == 200) {
            window.location.replace("/#/");
          }
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  deleteVariation = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(`${domain}/item-variations/${this.props.match.params.id}`, config)
      .then((response) => {
        if (response.status == 204) {
          window.history.back();
        }
      });
  };

  getBase64 = (base64) => {
    this.setState({ newBlob: base64 });
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
    let DeletePagevariationsARR = [];
    let varform = [];
    let discounts = [];
    let DeletePageDiscountsARR = [];
    const picture =
      this.state.pictures !== ""
        ? this.state.pictures
        : this.state.selectedVariationDits.image;
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
    if (this.state.newVariations !== "") {
      for (let [key, value] of Object.entries(this.state.newVariations)) {
        DeletePagevariationsARR.push(
          <>
            <tr>
              {" "}
              <td>{key}</td>
              <td>{value}</td>
            </tr>
            <Button
              onClick={() => this.deleteInnerVariation(key)}
              variant="danger"
              type="button"
            >
              delete variation {`(${key} - ${value})`}
            </Button>
          </>
        );
      }
    }
    if (
      this.state.selectedVariationDits &&
      this.state.selectedVariationDits.discounts
    ) {
      for (let [key, value] of Object.entries(this.state.newDIscount)) {
        DeletePageDiscountsARR.push(
          <>
            <tr>
              {" "}
              <td>{key} or more</td>
              <td>{value * 100}%</td>
            </tr>
            <Button
              onClick={() => this.deletDiscount(key)}
              variant="danger"
              type="button"
            >
              delete discount {`(${key} or more - ${value * 100}%})`}
            </Button>
          </>
        );
      }
    }
    return (
      <div className="Uploadpage">
        <Container className="productUploadContainer">
          <Form className="varUploadForm">
            <Row>
              <Col xl={6}>
                <Crop
                  className="cropper"
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Col>
              <Col xl={6}>
                <ProductCard pictures={picture}></ProductCard>
                <p className="FormRejects"> {this.state.responsData.image}</p>
              </Col>
            </Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>var description</Form.Label>
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
            </Form.Group>

            <Row>
              <Col xl={6}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td>variation name</td>
                    <td>variation value</td>
                  </thead>
                  <tbody>{DeletePagevariationsARR}</tbody>
                </Table>
              </Col>
              <Col xl={6}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td>discount per units</td>
                    <td>discount rate</td>
                  </thead>
                  <tbody>{DeletePageDiscountsARR}</tbody>
                </Table>
              </Col>
              <Button
                onClick={this.addVar}
                type="button"
                variant="success"
                disabled={this.state.isVarButtonActive}
              >
                add variation
              </Button>

              <Row></Row>
              <Row>
                {" "}
                <Col xl={12}>{varform}</Col>
              </Row>
              <Button
                disabled={this.state.isDiscountButtonActive}
                onClick={this.addDiscount}
                type="button"
                variant="success"
              >
                add discount
              </Button>
            </Row>
            <Row>
              <Col xl={12}>{discounts}</Col>
            </Row>

            <Row>
              <Col xl={7}>
                <Button
                  type="button"
                  variant="danger"
                  onClick={this.deleteVariation}
                >
                  delete variation
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
export default withRouter(EditVariationPage);
