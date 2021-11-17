import axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { categoriesAndSubCategories, domain } from "../components/utils";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax_id: "",
      name: "",
      address: "",
      phone_number: "",
      messages: "",
      category: "",
    };
  }
  submitChanges = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .patch(
        `${domain}/my-accounts/${this.props.activeAccount.id}/`,
        {
          name:
            this.state.name == ""
              ? this.props.activeAccount.name
              : this.state.name,
          store_address:
            this.state.address == ""
              ? this.props.activeAccount.store_address
              : this.state.address,
          tax_id:
            this.state.tax_id == ""
              ? this.props.activeAccount.tax_id
              : this.state.tax_id,
          phone_number:
            this.state.phone_number == ""
              ? this.props.activeAccount.phone_number
              : this.state.phone_number,
          is_active: true,
          account_type: this.props.activeAccount.account_type,
          category:
            this.state.category == ""
              ? this.props.activeAccount.category
              : this.state.category,
          //   messages:
          //     this.state.messages == ""
          //       ? this.props.activeAccount.messages
          //       : this.state.messages,
          country: this.props.activeAccount.country,
          language: this.props.activeAccount.language,
        },
        config
      )
      .then((res) => {
        console.log(res);
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount = () => {
    console.log(this.props.me);
    this.setState();
  };
  render() {
    let showCategories = [];
    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });

    return (
      <>
        {" "}
        <div style={{ marginTop: "70px" }}>
          <Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>שם העסק</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder={`${this.props.activeAccount.name}`}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ח"פ</Form.Label>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  name="tax_id"
                  placeholder={`${this.props.activeAccount.tax_id}`}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>טלפון</Form.Label>
                <Form.Control
                  type="number"
                  onChange={this.handleChange}
                  name="phone_number"
                  placeholder={`${this.props.activeAccount.phone_number}`}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>כתובת העסק</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  placeholder={`${this.props.activeAccount.store_address}`}
                />
                {/* <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>לוח מודעות</Form.Label>
                <Form.Control
                  name="messages"
                  onChange={this.handleChange}
                  type="text"
                  placeholder={`${this.props.activeAccount.messages}`}
                /> */}

                <Form.Label> קטגוריה ראשית</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  as="select"
                  name="category"
                >
                  <option value={this.props.activeAccount.category}>
                    {this.props.activeAccount.category}
                  </option>
                  {showCategories}
                </Form.Control>
              </Form.Group>
            </Form>{" "}
            <div>{`סוג חשבון : ${this.props.activeAccount.account_type}`}</div>
            <div>{`מדינה : ${this.props.activeAccount.country}`}</div>
            <div>{`מספר חשבון :  ${this.props.activeAccount.id}`}</div>
            <div>{`שפה : ${this.props.activeAccount.language}`}</div>
            <div>{``}</div>
            <div>{``}</div>
            <Button onClick={this.submitChanges} type="button">
              עדכן פרטים
            </Button>
          </Container>
        </div>
      </>
    );
  }
}
