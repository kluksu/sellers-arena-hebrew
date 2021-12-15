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
          postData(
            `${domain}/my-accounts/${this.props.activeAccount.id}/add_user/`,
            { user_id: data.id, user_type: this.state.userPermmitions },
            ` ${this.props.accessToken}`
          )
            .then((data) => {
              this.props.openGenericModal("הצלחה!", "המשתמש נוסף לחשבונך");
            })
            .catch(
              this.props.openGenericModal(
                "אופס!",
                "אנא וודא שכל השדות מלאים ונכונים ולאחר מכן נסה שנית"
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
        });
      }
    } else {
      this.setState({
        userPremmitionsMassege: "אנא בחר אפשרות מהרשימה",
      });
    }
  };

  render() {
    const emailNote =
      this.state.emailValidate === false ? (
        <p className="FormRejects">אנא וודא שכתובת המייל נכונה</p>
      ) : (
        ""
      );
    const PasswordNote =
      this.state.passwordValidate === false ? (
        <p className="FormRejects">
          מינימום שמונה תווים, אות קטנה אחת ואות גדולה אחת
          <br />
          מספר אחד וסימן אחד.{" "}
        </p>
      ) : (
        ""
      );
    const repetPasswordNote =
      this.state.repetPasswordValidate === false ? (
        <p className="FormRejects"> הססמאות אינן תואמות</p>
      ) : (
        ""
      );

    const phonNote =
      this.state.phoneValidate === false ? (
        <p className="FormRejects">מספר הטלפון חייב להכיל עשר ספרות</p>
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
                <Form.Label>כתובת מייל</Form.Label>
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
                <Form.Label>סיסמא</Form.Label>
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
                <Form.Label> הקש את הסיסמא בשנית</Form.Label>
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
                <Form.Label> טלפון</Form.Label>
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
                    <Form.Label>הרשאות משתמש </Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      placeholder="-----"
                      type="text"
                      as="select"
                      name="userPermmitions"
                    >
                      <option value={""}>------------</option>
                      <option value={"read"}>קריאה בלבד</option>
                      <option value={"write"}>קריאה ועריכה</option>
                      <option value={"admin"}>
                        מנהל(קריאה,עריכה וניהול משתמשים){" "}
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
              שלח
            </Button>
          </>
        </Container>
      </div>
    );
  }
}
