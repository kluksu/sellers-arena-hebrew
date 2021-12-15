import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { domain, getInfo, handleChange, postData } from "../components/utils";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidate: true,
      password: "",
      passwordValidate: true,
      repetPassword: "",
      repetPasswordValidate: true,
      phone: "",
      phoneValidate: true,
      allValidationStates: false,
      passwordErrorMessege: "",
      emailErrorMessege: "",
      phone_numberErrorMessege: "",
      registerData: "",
    };
  }
  componentDidUpdate(prvProps, prevState) {
    if (
      (this.state.repetPasswordValidate !== prevState.repetPasswordValidate ||
        this.state.passwordValidate !== prevState.repetPasswordValidate ||
        this.state.phoneValidate !== prevState.phoneValidate ||
        this.state.emailValidate !== prevState.emailValidate) &&
      this.state.repetPasswordValidate === true &&
      this.state.password.length > 0 &&
      this.state.passwordValidate === true &&
      this.state.phoneValidate === true &&
      this.state.emailValidate === true
    ) {
      this.setState({ allValidationStates: true });
    }
    if (
      this.state.allValidationStates !== prevState.allValidationStates &&
      this.state.allValidationStates === true
    ) {
      postData(`${domain}/register/`, {
        email: this.state.email,
        password: this.state.password,
        phone_number: this.state.phone,
      }).then((data) => {
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
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  authinticateForm = () => {
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
      this.setState({ allValidationStates: true });
    }
  };

  render() {
    const emailNote =
      this.state.emailValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">אנא וודא שכתובת המייל נכונה</p>
      );
    const PasswordNote =
      this.state.passwordValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">
          מינימום שמונה תווים, אות גדולה אחת, את קטנה אחת
          <br />
          מספר אחד, וסימן אחד.{" "}
        </p>
      );
    const repetPasswordNote =
      this.state.repetPasswordValidate === true ? (
        ""
      ) : (
        <p className="FormRejects"> הסיסמאות אינן תואמות</p>
      );

    const phonNote =
      this.state.phoneValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">10 ספרות</p>
      );
    const success = this.state.registerData.id ? (
      <p>
        נרשמת בהצלחה, כעת הינך יכול להתחבר למערכת באמצעות לחצן "התחבר" בצד שמאל
        למעלה
      </p>
    ) : (
      <>
        {" "}
        <Form>
          <p className="info-p-registerContainer">
            רק משתמשים רשומים יכולים:<br></br>
            -לראות את מרבית המחירים.<br></br>
            -ליצור הזמנות.<br></br>
            -לפתוח חנויות ולהעלות מוצרים.<br></br>
          </p>
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
              placeholder="**********"
              value={this.state.password}
              name="password"
            />
          </Form.Group>
          {PasswordNote}
          <p className="FormRejects">{this.state.passwordErrorMessege}</p>

          <Form.Group controlId="formGroupRepetPassword">
            <Form.Label> הקש סיסמתך בשנית</Form.Label>
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
          <p className="FormRejects">{this.state.phone_numberErrorMessege}</p>
        </Form>
        <p className="FormRejects">{this.state.errorMessege}</p>
        <Button onClick={this.authinticateForm} type="button">
          {" "}
          שלח
        </Button>
      </>
    );
    return (
      <div className="registerPage">
        <Container className="registerContainer">{success}</Container>
      </div>
    );
  }
}
