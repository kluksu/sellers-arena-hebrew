import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Col, Container, Form, Row, Button, Modal } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import EditVariationsCard from "../components/EditVariationsCard";

import Crop from "../components/Crop";
import "react-image-crop/dist/ReactCrop.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import axios from "axios";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
} from "../components/utils";

class EditItemPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: "",
      productName: "",
      description: "",
      visibility: '{"price":1,"item":1}',
      currency: "ils",
      category: "",
      subcategory: "",
      pictures: "",
      responsData: "",
      image: "",
      uploadImage: "",
      itemFormData: "",
      newBlob: "",
      newProductID: "",
      selectedItemDits: "",
      isOpen: false,
    };

    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      image: picture,
    });
  }
  handleClose = () => this.setState({ isOpen: false });
  handleShow = () => this.setState({ isOpen: true });
  deleteItem = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(`${domain}/items/${this.props.match.params.id}`, config)
      .then((response) => {
        if (response.status == "204") window.location.replace("#/add_items/");
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
  componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get(`${domain}/items/${this.props.match.params.id}`, config)
      .then((res) => {
        this.setState({ selectedItemDits: res.data });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedItemDits !== prevState.selectedItemDits) {
      let res = this.state.selectedItemDits;

      this.setState({
        productName: res.name,
        description: res.description,
        currency: res.currency,
        category: res.category,
        subcategory: res.subcategory,
        visibility: JSON.stringify(res.visibility),
      });
    }
  }
  uploadItem = (base64) => {
    let productPost = new FormData();
    productPost.append("name", this.state.productName);
    productPost.append("description", this.state.description);
    productPost.append("currency", this.state.currency);
    productPost.append("category", this.state.category);
    productPost.append("subcategory", this.state.subcategory);
    productPost.append("account_id", this.props.activeAccount.id);
    productPost.append("visibility", this.state.visibility);
    if (this.state.newBlob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    } else {
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
        `${domain}/items/${this.props.match.params.id}/`,
        productPost,
        config
      )
      .then(
        (response) => {
          if (response.status == "200") {
            this.setState({ newProductID: response.data.id });
            this.props.getCurrentUploadItemId(this.state.selectedItemDits.id);
            window.location.replace("/#/add_items");
          }
        },
        (error) => {}
      );
  };

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
    let showSubCategories = [];
    let showCategories = [];

    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );

      if (Object.keys(category)[0] === this.state.category) {
        Object.values(category).forEach((categoryObj) => {
          categoryObj.forEach((subcategory) => {
            showSubCategories.push(
              <option value={subcategory}>{subcategory}</option>
            );
          });
        });
      }
    });
    let variationsArr = [];
    const priceForAll = '{"price":1,"item":1}';
    const priceForVerified = '{"Price":2,"item":1}}';
    const sellerContacts = '{"price":3,"item":1}';
    const noBody = '{"price":4,"item":1}';
    const itemForVerified = '{"price":2,"item":2}';
    const picture =
      this.state.pictures !== ""
        ? this.state.pictures
        : this.state.selectedItemDits.image;
    if (this.state.selectedItemDits.item_variations) {
      for (
        let i = 0;
        i < this.state.selectedItemDits.item_variations.length;
        i++
      ) {
        const variation = this.state.selectedItemDits.item_variations[i];
        variationsArr.push(
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <EditVariationsCard
              pictures={variation.image}
              link={`/#/edit_variation/${variation.id}`}
              id={variation.id}
              variations={variation.variation}
              discounts={variation.discounts}
            ></EditVariationsCard>
          </Col>
        );
      }
    }
    return (
      <div className="Uploadpage">
        <Container className="productUploadContainer">
          <p className="FormRejects"> {this.state.responsData.detail}</p>
          <Form>
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
            <Row>
              <Col xl={6}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>שם מוצר</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.productName}
                    placeholder="שם מוצר"
                    name="productName"
                  />
                </Form.Group>
                <p className="FormRejects"> {this.state.responsData.name}</p>
              </Col>
              <Col xl={6}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>מטבע</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    value={this.state.currency}
                    as="select"
                    name="currency"
                  >
                    <option value={"ils"}>NIS ₪</option>

                    <option value="usd">USD $</option>
                    <option>EU €</option>
                    <option>GBP £ </option>
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.responsData.currency}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xl={4}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label> קטגוריה ראשית</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    value={this.state.category}
                    name="category"
                  >
                    <option>----------</option>
                    {showCategories}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.responsData.category}
                </p>
              </Col>
              <Col xl={4}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label> קטגוריה משנית</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    value={this.state.subcategory}
                    name="subcategory"
                  >
                    <option>-----------</option>
                    {showSubCategories}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.responsData.subcategory}
                </p>
              </Col>
              <Col xl={4}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>מי יכול לראות את המחיר</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    value={this.state.visibility}
                    name="visibility"
                  >
                    <option value={priceForAll}>כולם</option>
                    <option value={priceForVerified}>
                      רק משתמשים רשומים (מומלץ){" "}
                    </option>
                    {/* <option>contacts only </option>
              <option>only me (and my staff)</option> */}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.responsData.visibility}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>תיאור מוצר</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="textarea"
                    rows={3}
                    value={this.state.description}
                    placeholder="תיאור..."
                    name="description"
                  />
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.responsData.description}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xl={8}>
                <Button
                  onClick={this.uploadItem}
                  type="button"
                  variant="primary"
                >
                  שלח
                </Button>
              </Col>
              <Col xl={4}>
                <Button
                  onClick={this.handleShow}
                  type="button"
                  variant="danger"
                >
                  מחק את המוצר (ואת הוריאציות שלו){" "}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Button
                  onClick={() =>
                    window.location.assign(
                      `/#/ProductVaritionPage/${this.props.match.params.id}`
                    )
                  }
                  type="button"
                  variant="primary"
                >
                  הוסף וריאציות חדשות
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <h1>וריאציות</h1>
              </Col>
            </Row>

            <Row>{variationsArr}</Row>
          </Form>
        </Container>
        <>
          <Modal show={this.state.isOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>אזהרה!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              אתה עומד למחוק את מוצר זה, <br></br>
              <br></br>
              מה תרצה לעשות?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                variant="danger"
                onClick={this.deleteItem}
              >
                מחק
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                חזור
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}
export default withRouter(EditItemPage2);
