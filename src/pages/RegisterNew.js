import axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReadAllBox from "../components/ReadAllBox";
import { domain, handleKeyDown, postData } from "../components/utils";
import PrivecyPolicy from "./PrivecyPolicy";
import TermOfUse from "./TermOfUse";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTermsCheckboxDisabled: true,
      isPrivecyCheckboxDisabled: true,
    };
  }
  sendForm = () => {
    postData(`${domain}/register/`, {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      phone_number: this.state.phone_number,
      terms_agreed: this.state.terms_agreed,
      terms_revision: "1.0.0",
      privacy_policy_revision: "1.0.0",
      privacy_policy_agreed: this.state.privacy_policy_agreed,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    })
      .then((data) => {
        console.log(data);
        if (data.id) {
          this.props.openGenericModal(
            "הצלחה",
            " 'הודעת אימות נשלחה למייל שלך, נא אשר את הרשמתך ולאחר מכן התחבר לאתר דרך לחצן 'התחבר' בצד שמאל למעלה. במידה ואינך רואה את הודעת האימות חפש בתקיית דואר הזבל. אם עדיין אינך מוצא את ההודעה לחץ על כפתור שחזר סיסמא בעמוד ההתחברות לאתר",
            <Button onClick={this.props.closeGenericModal}> סגור</Button>,
            "prevent"
          );
        } else {
          Object.entries(data).forEach((field) => {
            this.setState({ [`${field[0]}_error`]: field[1] });
          });
          window.scrollTo(0, 0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  activetTermsCheckbox = (state) => {
    this.setState({ [state]: false });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.setState({
      [`${name}_error`]: "",
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      console.log(this.state);
    }
  }
  render() {
    let form = (
      <>
        <Form onKeyDown={(event) => handleKeyDown(event, this.sendForm)}>
          <p className="info-p-registerContainer">
            רק משתמשים רשומים יכולים:<br></br>
            -לראות את מרבית המחירים.<br></br>
            -לקבל מידע על הספקים.<br></br>
            -ליצור הזמנות.<br></br>
            -לפתוח חנויות ולהעלות מוצרים.<br></br>
          </p>
          <p className="FormRejects">{this.state.detail_error}</p>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>כתובת מייל</Form.Label>
            <Form.Control
              className="formValid"
              onChange={(e) => this.handleInputChange(e)}
              type="email"
              value={this.state.email}
              name="email"
              required
              placeholder="john@mail.com"
            />
          </Form.Group>
          <p className="FormRejects">{this.state.email_error}</p>

          <Form.Group>
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control
              className="formValid"
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              value={this.state.last_name}
              name="last_name"
              required
            />
            <p className="FormRejects">{this.state.last_name_error}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              className="formValid"
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              value={this.state.first_name}
              name="first_name"
              required
            />
            <p className="FormRejects">{this.state.first_name_error}</p>
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Text>
              על הסיסמא להכיל שמונה תווים לפחות, אות אחת קטנה אות אחת גדולה,
              מספר, וסימן
            </Form.Text>
            <Form.Control
              onChange={(e) => this.handleInputChange(e)}
              type="password"
              placeholder="**********"
              value={this.state.password}
              name="password"
            />
          </Form.Group>
          <p className="FormRejects">{this.state.password_error}</p>
          <p className="FormRejects">
            {" "}
            {this.state.detail_error &&
            this.state.detail_error.includes("password")
              ? "הסיסמא אינה עומדת בכללים"
              : ""}
          </p>
          {/* <Form.Group controlId="formGroupRepetPassword">
            <Form.Label> הקש סיסמתך בשנית</Form.Label>
            <Form.Control
              onChange={(e) => this.handleInputChange(e)}
              type="password"
              placeholder="repet Password"
              value={this.state.repetPassword}
              name="repetPassword"
            />
          </Form.Group> */}
          <Form.Group controlId="formGroupPhoneNumber">
            <Form.Label> טלפון</Form.Label>
            <Form.Control
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              placeholder="xxx-xxxxxxx"
              value={this.state.phone_number}
              name="phone_number"
            />
          </Form.Group>
          <p className="FormRejects">{this.state.phone_number_error}</p>
        </Form>
        <div>
          נא אשר את{" "}
          <a
            onClick={() =>
              this.props.openGenericModal(
                "עליך לקרוא את כל התנאים ורק אז לאשר או לדחות ",
                <ReadAllBox
                  runFunction={() =>
                    this.activetTermsCheckbox("isTermsCheckboxDisabled")
                  }
                  content={<TermOfUse></TermOfUse>}
                ></ReadAllBox>,
                "",
                "",
                "modal90W"
              )
            }
            href={window.location.href}
          >
            תנאי השימוש <br></br>
          </a>
          (ניתן לאשר את תנאי השימוש רק לאחר קריאתם)
          <div>
            <br></br>
            <label for="terms_agreed">
              {" "}
              קראתי ואני מאשר את תנאי השימוש של האתר{" "}
            </label>
            <input
              onChange={(e) => this.handleInputChange(e)}
              disabled={this.state.isTermsCheckboxDisabled}
              // checked={false}
              type="checkbox"
              // value="approved"
              id="horns"
              name="terms_agreed"
            ></input>

            <p className="FormRejects">{this.state.terms_agreed_error}</p>
          </div>
        </div>
        <div>
          נא אשר את{" "}
          <a
            onClick={() =>
              this.props.openGenericModal(
                "עליך לקרוא את כל התנאים ורק אז לאשר או לדחות ",
                <ReadAllBox
                  runFunction={() =>
                    this.activetTermsCheckbox("isPrivecyCheckboxDisabled")
                  }
                  content={<PrivecyPolicy></PrivecyPolicy>}
                ></ReadAllBox>,
                "",
                "",
                "modal90W"
              )
            }
            href={window.location.href}
          >
            מדיניות הפרטיות <br></br>
          </a>
          (ניתן לאשר את מדיניות הפרטיות רק לאחר קריאתה)
          <div>
            <br></br>

            <label for="privacy_policy_agreed">
              {" "}
              קראתי ואני מאשר את מדיניות הפרטיות של האתר
            </label>
            <input
              onChange={(e) => this.handleInputChange(e)}
              disabled={this.state.isPrivecyCheckboxDisabled}
              // checked={false}
              type="checkbox"
              // value="approved"
              id="horns"
              name="privacy_policy_agreed"
            ></input>

            <p className="FormRejects">
              {this.state.privacy_policy_agreed_error}
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            this.sendForm();
          }}
          type="button"
        >
          {" "}
          שלח
        </Button>
      </>
    );

    return (
      <div className="registerPage">
        <Container className="registerContainer">{form}</Container>
      </div>
    );
  }
}
