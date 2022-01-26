import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Crop from "../components/Crop";
import AddVars from "./addVars";
import QuantityDiscount from "../components/QuantityDiscount";
import { withRouter } from "react-router-dom";
import { domain, handleKeyDown } from "../components/utils";

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
      varCounter: 1,
      varsInfo: "",
      discountCounter: 1,
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
  getCropedSizes = (width, height) => {
    this.setState({ width: width, height: height });
  };
  removeVars = (key) => {
    this.setState({
      varsInfo: Object.assign(
        {},
        this.state.varsInfo,
        delete this.state.varsInfo[key]
      ),
    });
  };
  removeDiscount = (key) => {
    this.setState({
      discounts: Object.assign(
        {},
        this.state.discounts,
        delete this.state.discounts[key]
      ),
    });
  };
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
      varsInfo: {},

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
    key = key.trim();
    value = value.trim();
    obj[key] = value;
    this.setState({
      varsInfo: Object.assign({}, this.state.varsInfo, { [key]: value }),
    });
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    key = key.trim();
    value = value.trim();
    discounts[key] = value;
    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
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
        },
        (error) => {}
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
          removeVars={this.removeVars}
          varCounter={this.state.varCounter}
          addVar={this.addVar}
          updateObj={this.updateObj}
        ></AddVars>
      );
    }

    for (let i = 0; i < this.state.discountCounter; i++) {
      discounts.push(
        <QuantityDiscount
          removeDiscount={this.removeDiscount}
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
              מחק וריאציה {`(${key} - ${value})`}
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
              <td> או יותר {key}</td>
              <td>{value * 100}%</td>
            </tr>
            <Button
              onClick={() => this.deletDiscount(key)}
              variant="danger"
              type="button"
            >
              מחק הנחה {`( ${value * 100}% - או יותר ${key})`}
            </Button>
          </>
        );
      }
    }
    return (
      <div className="Uploadpage">
        <Container
          onKeyDown={(event) => handleKeyDown(event, this.uploadVar)}
          className="productUploadContainer"
        >
          <Form className="varUploadForm">
            <Row>
              <Col xl={6}>
                <p className="FormRejects">
                  {" "}
                  {`רוחב - ${this.state.width}  גובה-${this.state.height}`}
                </p>
                <Crop
                  getCropedSizes={this.getCropedSizes}
                  className="cropper  "
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Col>
              <Col xl={6}>
                <ProductCard
                  closeGenericModal={this.props.closeGenericModal}
                  openGenericModal={this.props.openGenericModal}
                  pictures={picture}
                ></ProductCard>
                <p className="FormRejects"> {this.state.responsData.image}</p>
              </Col>
            </Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>תיאור וריאציה</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="textarea"
                rows={3}
                value={this.state.description}
                placeholder="תיאור..."
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>גודל מנה</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="לדוגמה 10 יחדות בארגז"
                value={this.state.batch_size}
                name="batch_size"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>במלאי</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="stock"
                value={this.state.amount_in_stock}
                name="amount_in_stock"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>מחיר ליחידה</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="מחיר ליחידה"
                value={this.state.cost_per_item}
                name="cost_per_item"
              />
            </Form.Group>

            <Row>
              <Col xl={6}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td> (לדוגמה משקל)שם וריאציה</td>
                    <td> (לדוגמה 4 קילו)ערך וריאציה</td>
                  </thead>
                  <tbody>{DeletePagevariationsARR}</tbody>
                </Table>
              </Col>
              <Col xl={6}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td>הנחת כמות</td>
                    <td>גובה ההנחה</td>
                  </thead>
                  <tbody>{DeletePageDiscountsARR}</tbody>
                </Table>
              </Col>
              {/* <Button
                onClick={this.addVar}
                type="button"
                variant="success"
                disabled={this.state.isVarButtonActive}
              >
                הוסף וריאציה
              </Button> */}

              <Row></Row>
              <Row>
                {" "}
                <Col xl={12}>{varform}</Col>
              </Row>
              {/* <Button
                disabled={this.state.isDiscountButtonActive}
                onClick={this.addDiscount}
                type="button"
                variant="success"
              >
                הוסף הנחה
              </Button> */}
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
                  מחק וריאציה
                </Button>
              </Col>
              <Col xl={3}>
                <Button type="button" onClick={this.uploadVar}>
                  שלח
                </Button>
              </Col>
              <Col xl={2}>
                <Button type="button" variant="danger" onClick={this.resetPage}>
                  מחק את הטופס
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
