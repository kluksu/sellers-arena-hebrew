import React, { Component } from "react";
import { Button, Form, Container, Col, Row, Tabs } from "react-bootstrap";
import { domain, postData } from "./utils";

export default class CreatUserInAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPermmitions: "",
      userPremmitionsMassege: "",

      email: "",
      emailValidate: "",
      password: "",
      passwordValidate: "",
      repetPassword: "",
      repetPasswordValidate: "",
      phone: "",
      phoneValidate: "",
      passwordErrorMessege: "",
      emailErrorMessege: "",
      phone_numberErrorMessege: "",
      registerData: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  authinticateForm = () => {
    if (this.state.userPermmitions !== undefined) {
      console.log(this.state.userPermmitions);
      this.setState({ phone_numberErrorMessege: "" });
      this.setState({ emailErrorMessege: "" });
      this.setState({ passwordErrorMessege: "" });

      if (this.state.email.includes("@" && ".")) {
        this.setState({ emailValidate: true });
      } else {
        this.setState({ emailValidate: false });
      }

      let passwordFormat = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      );

      if (passwordFormat.test(this.state.password) === true) {
        this.setState({ passwordValidate: true });
      } else {
        this.setState({ passwordValidate: false });
      }
      if (
        this.state.password === this.state.repetPassword &&
        this.state.repetPassword.length > 7
      ) {
        this.setState({ repetPasswordValidate: true });
      } else {
        this.setState({ repetPasswordValidate: false });
      }
      if (this.state.phone.length === 10) {
        this.setState({ phoneValidate: true });
      } else {
        this.setState({ phoneValidate: false });
      }
      if (
        this.state.repetPasswordValidate === true &&
        this.state.password.length > 0 &&
        this.state.passwordValidate === true &&
        this.state.phoneValidate === true &&
        this.state.emailValidate === true
      ) {
        postData(`${domain}/register/`, {
          email: this.state.email,
          password: this.state.password,
          phone_number: this.state.phone,
        }).then((data) => {
          console.log(data.id);
          postData(
            `${domain}/my-accounts/${this.props.activeAccount.id}/add_user/`,
            { user_id: data.id, user_type: this.state.userPermmitions },
            ` ${this.props.accessToken}`
          )
            .then((data) => {
              this.props.openGenericModal(
                "success!",
                "new user was added to your account successfully"
              );
              console.log(data);
            })
            .catch(
              this.props.openGenericModal(
                "Error!",
                "please verify that all the fields are field correctly and try again"
              )
            );
          this.setState({ registerData: data });
          this.setState({
            emailErrorMessege: data.email,
            passwordErrorMessege: data.password,
            phone_numberErrorMessege: data.phone_number,
          });
          this.setState({
            password: "",
            email: "",
            repetPassword: "",
            phone: "",
          });

          console.log(this.state.registerData); // JSON data parsed by `data.json()` call
        });
      }
    } else {
      this.setState({
        userPremmitionsMassege: "please select an option from the list",
      });
    }
  };

  render() {
    const emailNote =
      this.state.emailValidate === false ? (
        <p className="FormRejects">please make sure your email is correct</p>
      ) : (
        ""
      );
    const PasswordNote =
      this.state.passwordValidate === false ? (
        <p className="FormRejects">
          Minimum eight characters, at least one uppercase letter, one lowercase
          letter,
          <br />
          one number and one special character:{" "}
        </p>
      ) : (
        ""
      );
    const repetPasswordNote =
      this.state.repetPasswordValidate === false ? (
        <p className="FormRejects"> passwords do not match</p>
      ) : (
        ""
      );
    console.log(this.state.phoneValidate);
    const phonNote =
      this.state.phoneValidate === false ? (
        <p className="FormRejects">phone number should be 10 digits long</p>
      ) : (
        ""
      );

    return (
      <div className="registerPage">
        <Container className="registerContainer">
          {" "}
          <>
            {" "}
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="formValid"
                  onChange={this.handleChange}
                  type="email"
                  value={this.state.email}
                  name="email"
                  required
                  placeholder="john@mail.com"
                />
              </Form.Group>
              {emailNote}
              <p className="FormRejects">{this.state.emailErrorMessege}</p>

              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                />
              </Form.Group>
              {PasswordNote}
              <p className="FormRejects">{this.state.passwordErrorMessege}</p>

              <Form.Group controlId="formGroupRepetPassword">
                <Form.Label> repet Password</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="password"
                  placeholder="repet Password"
                  value={this.state.repetPassword}
                  name="repetPassword"
                />
              </Form.Group>
              {repetPasswordNote}

              <Form.Group controlId="formGroupPhoneNumber">
                <Form.Label> phone number</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  placeholder="xxx-xxxxxxx"
                  value={this.state.phone}
                  name="phone"
                />
              </Form.Group>
              {phonNote}
              <p className="FormRejects">
                {this.state.phone_numberErrorMessege}
              </p>
              <Row>
                <Col xl={12}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>user promitions </Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      placeholder="-----"
                      type="text"
                      as="select"
                      name="userPermmitions"
                    >
                      <option value={""}>------------</option>
                      <option value={"read"}>read only</option>
                      <option value={"write"}>read and write</option>
                      <option value={"admin"}>
                        admin (read,write,control users)
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <p className="FormRejects">
                    {this.state.userPremmitionsMassege}
                  </p>
                </Col>
              </Row>
            </Form>
            <p className="FormRejects">{this.state.errorMessege}</p>
            <Button onClick={this.authinticateForm} type="button">
              {" "}
              submit
            </Button>
          </>
        </Container>
      </div>
    );
  }
}
