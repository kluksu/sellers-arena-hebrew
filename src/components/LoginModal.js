import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { postData } from "./utils";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const generalError = this.props.loginData.detail ? (
      <p className="FormRejects">{`${this.props.loginData.detail}, make sure your email and password are correct`}</p>
    ) : (
      ""
    );
    const EmailError = this.props.loginData.email ? (
      <p className="FormRejects">{this.props.loginData.email}</p>
    ) : (
      ""
    );
    const passwordError = this.props.loginData.password ? (
      <p className="FormRejects">{this.props.loginData.password}</p>
    ) : (
      ""
    );

    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {generalError}
          <Form.Group controlId="">
            <Form.Label> email</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              placeholder="email"
              name="email"
            />
          </Form.Group>
          {EmailError}
          <Form.Group controlId="formGroupPhoneNumber">
            <Form.Label> password</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              name="password"
            />
          </Form.Group>
          {passwordError}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              this.props.loginPostData(this.state.email, this.state.password)
            }
          >
            submit
          </Button>
          <Button variant="primary" onClick={this.props.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
