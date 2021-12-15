import React, { Component } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
  postData,
  postFormData,
} from "../components/utils";
import ImageUploader from "react-images-upload";
import Crop from "../components/Crop";
import "react-image-crop/dist/ReactCrop.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import axios from "axios";
import { HashRouter, Route, withRouter } from "react-router-dom";
import { RiTShirtAirFill } from "react-icons/ri";

class Uploadpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: "",
      productName: "",
      description: "",
      visibility: '{"price":2,"item":1}',
      currency: "ils",
      category: "",
      subcategory: "",
      pictures: [],
      responsData: "",
      image: "",
      uploadImage: "",
      itemFormData: "",
      newBlob: "",
      newProductID: "",
      productNameError: "",
      productCategoryError: "",
      productSubCategoryError: "",
    };

    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      image: picture,
    });
  }

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
    }

    this.setState({ itemFormData: productPost });
    for (let pair of productPost.entries()) {
    }
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios.post(`${domain}/items/`, productPost, config).then(
      (response) => {
        if (response.statusText === "Created") {
          this.setState({ newProductID: response.data.id });
          this.props.getCurrentUploadItemId(response.data.id);
          window.location.replace(`/#/ProductVaritionPage/${response.data.id}`);
        }
      },
      (error) => {
        this.setState({
          productNameError: "",
          productCategoryError: "",
          productSubCategoryError: "",
        });
        if (this.state.productName === "") {
          this.setState({ productNameError: "שדה חובה" });
        }
        if (this.state.category === "") {
          this.setState({
            productCategoryError: "שדה חובה",
          });
        }
        if (this.state.subcategory === "") {
          this.setState({
            productSubCategoryError: "שדה חובה",
          });
        }
      }
    );
  };

  // postFormData("${domain}/items/", this.state.productPost, ` ${this.props.accessToken}` )
  //         .then(data=>{
  //              this.setState({responsData:data})
  //

  //            }   )}

  //   postData("${domain}/items/",{"name":this.state.productName, "description":this.state.description,
  //   "currency":this.state.currency, "category":this.state.category, "subcategory":this.state.subcategory,
  //   "account_id":this.props.activeAccount.id,"visibility":this.state.visibility,"image":this.state.uploadImage},` ${this.props.accessToken}` )
  //   .then(data=>{
  //    this.setState({responsData:data})
  //

  //    })
  // }
  // {
  //     "name": "string",
  //     "description": "string",
  //     "currency": "ils",
  //     "batch_size": 0,
  //     "category": "string",
  //     "subcategory": "string",
  //     "account_id": 0,!!!!!!!!!!!
  //     "visibility": {},
  //     "image": "string"
  //   }
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

    const priceForAll = '{"price":1,"item":1}';
    const priceForVerified = '{"price":2,"item":1}';
    const sellerContacts = '{"price":3,"item":1}';
    const noBody = '{"price":4,"item":1}';
    const itemForVerified = '{"price":2,"item":2}';
    return (
      <div className="Uploadpage">
        <Container className="productUploadContainer">
          <p className="FormRejects"> {this.state.responsData.detail}</p>
          <Form>
            <h1>דף העלאת מוצר</h1>
            <br></br>
            <Row>
              <Col
                className="animate__animated animate__headShake animate__repeat-3	"
                xl={6}
                sm={12}
              >
                <Crop
                  className="cropper "
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Col>
              <Col xl={6}>
                <ProductCard
                  productName={this.state.productName}
                  currency={this.state.currency}
                  pictures={this.state.pictures}
                ></ProductCard>
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
                    placeholder="שם מוצר.."
                    name="productName"
                  />
                </Form.Group>
                <p className="FormRejects"> {this.state.productNameError}</p>
              </Col>
              <Col xl={6}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>מטבע</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
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
                    name="category"
                  >
                    <option value="">----------------</option>
                    {showCategories}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.productCategoryError}
                </p>
              </Col>
              <Col xl={4}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label> קטגוריה משנית</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    name="subcategory"
                  >
                    <option value="">--------------</option>
                    {showSubCategories}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">
                  {" "}
                  {this.state.productSubCategoryError}
                </p>
              </Col>
              <Col xl={4}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>מי יכול לראות את המחיר</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    name="visibility"
                  >
                    <option value={priceForVerified}>
                      רק משתמשים רשומים (מומלץ){" "}
                    </option>
                    <option value={priceForAll}>כולם</option>

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
                  <Form.Label>תיאור פריט</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="textarea"
                    rows={3}
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

            <Button onClick={this.uploadItem} type="button" variant="primary">
              הבא
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(Uploadpage);
