import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ReadAllBox from "../components/ReadAllBox";
import {
  domain,
  getInfo,
  handleChange,
  handleKeyDown,
  postData,
  scrollToHeighest,
  takeMeHome,
} from "../components/utils";

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
      isTermsCheckboxDisabled: true,
      IsTermsChecked: false,
      termsValidate: true,
      family: "",
      familyValidate: true,
      first: "",
      firstValidate: true,
      /////MIGHT CAUSE A BUG
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  activetTermsCheckbox = () => {
    this.setState({ isTermsCheckboxDisabled: false });
  };
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
      this.state.emailValidate === true &&
      this.state.termsValidate === true &&
      this.state.familyValidate === true &&
      this.state.firstValidate === true
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
        terms_agreed: this.state.IsTermsChecked,
        terms_revision: "1.0.0",
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      }).then((data) => {
        if (data.id) {
          this.props.openGenericModal(
            "הצלחה",
            " 'הודעת אימות נשלחה למייל שלך, נא אשר את הרשמתך ולאחר מכן התחבר לאתר דרך לחצן 'התחבר' בצד שמאל למעלה. במידה ואינך רואה את הודעת האימות חפש בתקיית דואר הזבל. אם ישנן בעיות נוספות צור איתנו קשר דרך עמוד 'צור קשר",
            <Button onClick={this.props.closeGenericModal}> סגור</Button>,
            "prevent"
          );
        }
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
          IsTermsChecked: "",
          family: "",
          first: "",
          repetPasswordValidate: true, /////MIGHT CAUSE A BUG
          passwordValidate: true, /////MIGHT CAUSE A BUG
          phoneValidate: true, /////MIGHT CAUSE A BUG
          emailValidate: true, /////MIGHT CAUSE A BUG
          termsValidate: true,
          familyValidate: true,
          firstValidate: true, /////MIGHT CAUSE A BUG
        });
      });
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  authinticateForm = async () => {
    this.setState({ phone_numberErrorMessege: "" });
    this.setState({ emailErrorMessege: "" });
    await this.setState({ passwordErrorMessege: "" });

    if (this.state.email.includes("@" && ".")) {
      await this.setState({ emailValidate: true });
    } else {
      await this.setState({ emailValidate: false });
    }

    let passwordFormat = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    if (passwordFormat.test(this.state.password) === true) {
      await this.setState({ passwordValidate: true });
    } else {
      await this.setState({ passwordValidate: false });
    }
    if (
      this.state.password === this.state.repetPassword &&
      this.state.repetPassword.length > 7
    ) {
      await this.setState({ repetPasswordValidate: true });
    } else {
      await this.setState({ repetPasswordValidate: false });
    }
    if (this.state.phone.length === 10) {
      await this.setState({ phoneValidate: true });
    } else {
      await this.setState({ phoneValidate: false });
    }
    if (this.state.IsTermsChecked === false) {
      this.setState({ termsValidate: false });
    } else {
      this.setState({ termsValidate: true });
    }
    if (this.state.first === "") {
      this.setState({ firstValidate: false });
    } else {
      this.setState({ firstValidate: true });
    }
    if (this.state.family === "") {
      this.setState({ familyValidate: false });
    } else {
      this.setState({ familyValidate: true });
    }

    if (
      this.state.repetPasswordValidate === true &&
      this.state.password.length > 0 &&
      this.state.passwordValidate === true &&
      this.state.phoneValidate === true &&
      this.state.emailValidate === true &&
      this.state.IsTermsChecked === true &&
      this.state.firstValidate === true &&
      this.state.familyValidate === true
    ) {
      await this.setState({ allValidationStates: true });
    }
    scrollToHeighest([
      this.state.emailErrorMessege !== "" || this.state.emailValidate === false
        ? "registerEmailError"
        : null,
      this.state.passwordErrorMessege !== "" ||
      this.state.passwordValidate === false
        ? "registerPasswordError"
        : null,
      this.state.phone_numberErrorMessege !== "" ||
      this.state.phoneValidate === false
        ? "registerPhoneError"
        : null,
      this.state.repetPasswordValidate === false
        ? "registerRepetPasswordError"
        : null,
    ]);
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
    const termsNote =
      this.state.termsValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">
          חובה לאשר את תנאי השימוש (ניתן לסמן את התיבה רק לאחר גלילת התנאים עד
          הסוף)
        </p>
      );
    const familyNote =
      this.state.familyValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">נא וודא שמלאת את השדה בצורה תקינה</p>
      );
    const firstNote =
      this.state.firstValidate === true ? (
        ""
      ) : (
        <p className="FormRejects">נא וודא שמלאת את השדה בצורה תקינה</p>
      );
    const success = this.state.registerData.id ? (
      <p onClick={takeMeHome()}>
        הודעת אימות נשלחה למייל שלך, נא אשר את הרשמתך ולאחר מכן התחבר לאתר דרך
        לחצן 'התחבר' בצד שמאל למעלה. במידה ואינך רואה את הודעת האימות חפש בתקיית
        דואר הזבל. אם ישנן בעיות נוספות צור איתנו קשר דרך עמוד 'צור קשר'
      </p>
    ) : (
      <>
        {" "}
        <Form
          onKeyDown={(event) => handleKeyDown(event, this.authinticateForm)}
        >
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

          <div id="registerEmailError">
            {" "}
            {emailNote}
            <p className="FormRejects">{this.state.emailErrorMessege}</p>
          </div>
          <Form.Group>
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control
              className="formValid"
              onChange={this.handleChange}
              type="text"
              value={this.state.family}
              name="family"
              required
            />
            {familyNote}{" "}
          </Form.Group>
          <Form.Group>
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              className="formValid"
              onChange={this.handleChange}
              type="text"
              value={this.state.first}
              name="first"
              required
            />
            {firstNote}{" "}
          </Form.Group>
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
          <div id="registerPasswordError">
            {PasswordNote}
            <p className="FormRejects">{this.state.passwordErrorMessege}</p>
          </div>
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
          <div id="registerRepetPasswordError">{repetPasswordNote}</div>
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
          <div id="registerPhoneError">
            {phonNote}
            <p className="FormRejects">{this.state.phone_numberErrorMessege}</p>
          </div>
        </Form>
        <p className="FormRejects">{this.state.errorMessege}</p>
        <div>
          נא אשר את{" "}
          <a
            onClick={() =>
              this.props.openGenericModal(
                "עליך לקרוא את כל התנאים ורק אז לאשר או לדחות ",
                <ReadAllBox
                  runFunction={this.activetTermsCheckbox}
                ></ReadAllBox>
              )
            }
            href={window.location.href}
          >
            תנאי השימוש <br></br>
          </a>
          (ניתן לאשר את תנאי השימוש רק לאחר קריאתם)
          <div>
            <input
              onChange={(e) => this.handleInputChange(e)}
              disabled={this.state.isTermsCheckboxDisabled}
              // checked={false}
              type="checkbox"
              // value="approved"
              id="horns"
              name="IsTermsChecked"
            ></input>
            <label for="IsTermsChecked">
              {" "}
              קראתי ואני מאשר את תנאי השימוש של האתר{" "}
            </label>
            {termsNote}
          </div>
        </div>
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
