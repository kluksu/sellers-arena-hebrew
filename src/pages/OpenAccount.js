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

    categoriesAndSubCategories.forEach((category) => {
      mainCategoryArr.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });
    return (
      <div className="registerPage">
        <Container className="registerContainer">
          <Form>
            <p className="info-p-registerContainer">
              כאן עליך למלא מידע אודות העסק שלך <br></br>
              המידע הזה ישמש בעסקאות עתידיות שיעשו באתר<br></br>
              תוכל לשנות מידע זה בעתיד אך מומלץ להזין אותו עכשיו <br></br>
              כך תיחשף לתכנים רבים יותר שיש לאתר להציע.
            </p>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>שם העסק</Form.Label>
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
              <Form.Label>כתובת</Form.Label>
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
              <Form.Label> ח"פ</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="tax id"
                name="taxID"
              />
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.tax_id}</p>

            <Form.Group controlId="formGroupPhoneNumber">
              <Form.Label> טלפון</Form.Label>
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
              <FormLabel>סוג חשבון</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="accountType"
              >
                <option>-------</option>
                <option value={3}>ספק</option>
                <option value={2}>קימונאי</option>
              </Form.Control>
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.account_type ? "שדה חובה" : ""}
            </p>
            <Form.Group>
              <FormLabel>קטגוריית חנות</FormLabel>
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
              <FormLabel>שפה</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="language"
              >
                <option>----------</option>
                <option value="hebrew">עברית</option>
                {/* <option value="english">english</option> */}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <FormLabel>מדינה</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="countrey"
              >
                <option>----------</option>
                <option value="israel">Israel</option>
                {/* <option value="USA">USA</option> */}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button onClick={this.creatAccount} type="button">
            {" "}
            שלח
          </Button>
        </Container>
      </div>
    );
  }
}
