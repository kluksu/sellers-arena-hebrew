import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { handleKeyDown, postData } from "./utils";

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
      <p className="FormRejects">{`אנא וודא ששם המשתמש והסיסמא נכונים`}</p>
    ) : (
      ""
    );
    const EmailError = this.props.loginData.email ? (
      <p className="FormRejects">שדה זה חייב להיות מלא</p>
    ) : (
      ""
    );
    const passwordError = this.props.loginData.password ? (
      <p className="FormRejects">שדה זה חייב להיות מלא</p>
    ) : (
      ""
    );

    return (
      <Modal
        onKeyDown={(event) =>
          handleKeyDown(event, () =>
            this.props.loginPostData(this.state.email, this.state.password)
          )
        }
        show={this.props.isOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>התחבר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="">
            <Form.Label> כתובת מייל</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="email"
              placeholder="email"
              name="email"
            />
          </Form.Group>
          {EmailError}
          <Form.Group controlId="formGroupPhoneNumber">
            <Form.Label> סיסמא</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              name="password"
            />
          </Form.Group>
          {passwordError}
          {generalError}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              this.props.loginPostData(this.state.email, this.state.password)
            }
          >
            שלח
          </Button>
          <Button variant="primary" onClick={this.props.closeModal}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
