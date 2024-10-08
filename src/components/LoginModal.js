import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { handleKeyDown, postData, whiteLableStores } from "./utils";

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
      <p className="FormRejects">{`אנא וודא ששם המשתמש והסיסמא נכונים, במידה והמשתמש הוא משתמש חדש יש לוודא שלינק אישור החשבון שנשלח מהכתובת noreply@sapakos.com נלחץ, אם אינך מוצא את המייל חפש בתקיית דואר הזבל`}</p>
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
            this.props.loginPostData(
              this.state.email.toLowerCase(),
              this.state.password,
              this.props.href ? whiteLableStores[this.props.href] : null
            )
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
              this.props.loginPostData(
                this.state.email.toLowerCase(),
                this.state.password,
                this.props.href ? whiteLableStores[this.props.href] : null
              )
            }
          >
            שלח
          </Button>
          <Button variant="primary" onClick={this.props.closeModal}>
            סגור
          </Button>
          <p
            className="forgotPassword"
            onClick={() =>
              this.props.openGenericModal(
                "על מנת לשחזר את הסיסמא הזן את כתובת המייל של החשבון ולאחר מכן לחץ על המשך",
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label> אימייל </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    name="category"
                    type="email"
                    name="email"
                    placeholder={this.state.email}
                  ></Form.Control>
                </Form.Group>,
                <>
                  <Button
                    onClick={() => {
                      this.props.resetPassword(this.state.email);
                      this.props.closeModal();
                      this.props.closeGenericModal();
                    }}
                  >
                    {" "}
                    שחזר סיסמא
                  </Button>
                  <Button
                    onClick={() => {
                      this.props.sendEmailAgain(this.state.email);
                      // this.props.closeModal();
                      // this.props.closeGenericModal();
                    }}
                  >
                    {" "}
                    שלח מייל אימות שנית{" "}
                  </Button>
                </>
              )
            }
          >
            שכחתי סיסמא
          </p>
        </Modal.Footer>
      </Modal>
    );
  }
}
