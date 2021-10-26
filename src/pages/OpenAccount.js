import React, { Component } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
  hebrewCategoriesAndSubCategories,
  postData,
  takeMeHome,
} from "../components/utils";

export default class OpenAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      taxID: "",
      phone: "",
      countrey: "",
      language: "",

      accountType: "",
      responseData: "",
      category: "",
    };
  }
  // }{
  //   "name": "string",
  //   "store_address": "string",
  //   "tax_id": "string",
  //   "phone_number": "string",
  //   "is_active": true,
  //   "account_type": 0
  // ${domain}/
  creatAccount = () => {
    postData(
      `${domain}/my-accounts/`,
      {
        name: this.state.name,
        store_address: this.state.address,
        tax_id: this.state.taxID,
        // is_active: true,
        account_type: this.state.accountType,
        phone_number: this.state.phone,
        category: this.state.category,
        countrey: this.state.countrey,
        language: this.state.language,
      },
      ` ${this.props.accessToken}`
    ).then((data) => {
      console.log(data);
      this.setState({ responseData: data });
      this.props.goToNewAccount(data);
      if (data.id) {
        window.location.assign("/#/");
      }
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let mainCategoryArr = [];
    let categories =
      this.props.activeAccount.language === "english"
        ? categoriesAndSubCategories
        : hebrewCategoriesAndSubCategories;
    categories.forEach((category) => {
      mainCategoryArr.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });
    return (
      <div className="registerPage">
        <Container className="registerContainer">
          <Form>
            <p className="info-p-registerContainer">
              your business information goes here <br></br>
              this information will be used for future transactions <br></br>
              you can change it later if necessery but its highly recomanded to
              do it now <br></br>
              this way you'll be exposed to more useful features.
            </p>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>name</Form.Label>
              <Form.Control
                className="formValid"
                onChange={this.handleChange}
                type="text"
                name="name"
                required
                placeholder="name.."
              />
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.name}</p>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>address</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="address"
                name="address"
              />
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.store_address}
            </p>

            <Form.Group controlId="formGroupRepetPassword">
              <Form.Label> tax id</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="tax id"
                name="taxID"
              />
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.tax_id}</p>

            <Form.Group controlId="formGroupPhoneNumber">
              <Form.Label> phone number</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="xxx-xxxxxxx"
                name="phone"
              />
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.phone_number}
            </p>

            <Form.Group>
              <FormLabel>account type</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="accountType"
              >
                <option>choose one</option>
                <option value={3}>supplier</option>
                <option value={2}>retailer</option>
              </Form.Control>
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.account_type
                ? "This field may not be blank"
                : ""}
            </p>
            <Form.Group>
              <FormLabel>store category</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="category"
              >
                <option>----------</option>
                {mainCategoryArr}
              </Form.Control>
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.category}</p>
            <Form.Group>
              <FormLabel>language</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="language"
              >
                <option>----------</option>
                <option value="hebrew">עברית</option>
                <option value="english">english</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <FormLabel>countrey</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="countrey"
              >
                <option>----------</option>
                <option value="Israel">Israel</option>
                <option value="USA">USA</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button onClick={this.creatAccount} type="button">
            {" "}
            submit
          </Button>
        </Container>
      </div>
    );
  }
}
