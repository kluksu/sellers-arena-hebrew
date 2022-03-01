import axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {
  categoriesAndSubCategories,
  domain,
  handleKeyDown,
} from "../components/utils";

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
      error: {},
      userError: {},
    };
  }
  deleteMe = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(`${domain}/me/`, config)
      .then((res) => {
        this.props.openGenericModal("המשתמש נמחק בהצלחה");
      })
      .catch((error) => {
        this.props.openGenericModal(
          "אופס, הייתה בעיה",
          "אנא נסה שנית מאוחר יותר",
          "אם הבעיה נמשכת אנא פנה לשירות הלקוחות שלנו דרך עמוד צור קשר"
        );
      });
  };
  submitAccountChanges = () => {
    this.setState({ error: {} });

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
          name: this.state.name,
          store_address: this.state.address,
          tax_id: this.state.tax_id,
          phone_number: this.state.phone_number,
          is_active: true,
          account_type: this.props.activeAccount.account_type,
          category: this.state.category,
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
        this.props.openGenericModal("מעולה", "השינויים נשמרו בהצלחה");
      })
      .catch((error) => {
        this.setState({ error: error.response.data });
        this.props.openGenericModal(
          "אופס",
          "יש בעיה, אנא בדוק שכל השדות מלאים ונכונים ונסה שנית"
        );
      });
  };
  submitUserChanges = () => {
    this.setState({ userError: {} });
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .patch(
        `${domain}/me/`,
        {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.user_phone_number,
        },
        config
      )
      .then((res) => {
        this.props.openGenericModal("מעולה", "השינויים נשמרו בהצלחה");
      })
      .catch((error) => {
        this.setState({ userError: error.response.data });
        this.props.openGenericModal(
          "אופס",
          "יש בעיה, אנא בדוק שכל השדות מלאים ונכונים ונסה שנית"
        );
      });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.activeAccount !== prevProps.activeAccount ||
      (!prevProps.activeAccount && this.props.activeAccount)
    ) {
      this.setState({
        tax_id: this.props.activeAccount.tax_id,
        name: this.props.activeAccount.name,
        address: this.props.activeAccount.store_address,
        phone_number: this.props.activeAccount.phone_number,
        messages: this.props.activeAccount.messages,
        category: this.props.activeAccount.category,
        email: this.props.me.email,
        first_name: this.props.me.first_name,
        last_name: this.props.me.last_name,
        user_phone_number: this.props.me.phone_number,
      });
      // <div>{`אימייל:${this.props.me.email}`}</div>
      // <div>{`שם:${this.props.me.first_name}`}</div>
      // <div>{`שם משפחה:${this.props.me.last_name}`}</div>
      // <div>{`מספר משתמש:${this.props.me.id}`}</div>
      // <div>{`טלפון משתמש :${this.props.me.phone_number}`}</div>
    }
  };
  componentDidMount = () => {
    if (this.props.activeAccount) {
      this.setState({
        tax_id: this.props.activeAccount.tax_id,
        name: this.props.activeAccount.name,
        address: this.props.activeAccount.store_address,
        phone_number: this.props.activeAccount.phone_number,
        messages: this.props.activeAccount.messages,
        category: this.props.activeAccount.category,
        email: this.props.me.email,
        first_name: this.props.me.first_name,
        last_name: this.props.last_name,
        user_phone_number: this.props.me.phone_number,
      });
    }
  };
  render() {
    let showCategories = [];
    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });
    if (this.props.activeAccount) {
      return (
        <>
          {" "}
          <div
          //  style={{ marginTop: "70px" }}
          >
            <Container
              className="profilePage"
              style={{ maxWidth: "400px", marginBottom: "100px" }}
            >
              <Form>
                <h1> פרטי חשבון</h1>

                <Button
                  onClick={() => this.props.resetPassword(this.props.me.email)}
                  type="button"
                >
                  אפס סיסמא
                </Button>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>שם העסק</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={`${this.state.name}`}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <p className="FormRejects">{this.state.error.name}</p>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>ח"פ</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={this.handleChange}
                    name="tax_id"
                    value={`${this.state.tax_id}`}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <p className="FormRejects">{this.state.error.tax_id}</p>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>טלפון</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={this.handleChange}
                    name="phone_number"
                    value={`${this.state.phone_number}`}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <p className="FormRejects">{this.state.error.phone_number}</p>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>כתובת העסק</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    onChange={this.handleChange}
                    value={`${this.state.address}`}
                  />
                  <p className="FormRejects">
                    {this.state.error.store_address}
                  </p>
                  {/* <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>לוח מודעות</Form.Label>
                <Form.Control
                  name="messages"
                  onChange={this.handleChange}
                  type="text"
                  value={`${this.state.messages}`}
                /> */}

                  <Form.Label> קטגוריה ראשית</Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    as="select"
                    name="category"
                  >
                    <option value={this.state.category}>
                      {this.state.category}
                    </option>
                    {showCategories}
                  </Form.Control>
                </Form.Group>
                <p className="FormRejects">{this.state.error.category}</p>
              </Form>{" "}
              <div>{`סוג חשבון : ${this.props.activeAccount.account_type}`}</div>
              <div>{`מדינה : ${this.props.activeAccount.country}`}</div>
              <div>{`מספר חשבון :  ${this.props.activeAccount.id}`}</div>
              <div>{`שפה : ${this.props.activeAccount.language}`}</div>
              <Button onClick={this.submitAccountChanges} type="button">
                עדכן פרטי חשבון
              </Button>
              <h1> פרטי משתמש</h1>
              <div>{`מספר משתמש:${this.props.me.id}`}</div>
              <div>{`אימייל: ${this.state.email}`}</div>
              <p className="FormRejects">{this.state.error.email}</p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> שם פרטי </Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  onChange={this.handleChange}
                  value={`${this.state.first_name}`}
                />
                <Form.Group></Form.Group>
              </Form.Group>
              <p className="FormRejects">{this.state.userError.first_name}</p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> שם משפחה </Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={this.handleChange}
                  value={`${this.state.last_name}`}
                />
                <Form.Group></Form.Group>
              </Form.Group>
              <p className="FormRejects">{this.state.userError.last_name}</p>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> טלפון משתמש</Form.Label>
                <Form.Control
                  type="number"
                  onChange={this.handleChange}
                  name="user_phone_number"
                  value={`${this.state.user_phone_number}`}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <p className="FormRejects">{this.state.userError.phone_number}</p>
              <Button onClick={this.submitUserChanges}>שמור פרטי משתמש</Button>
            </Container>
          </div>
          <div className="dangerZone">
            <h1> פעולות מסוכנות</h1>
            <Button
              variant="danger"
              onClick={() => {
                this.props.openGenericModal(
                  "שים לב!!",
                  "?מחיקת חשבון הינה פעולה שלא ניתנת לביטול, במידה ותפתח את חשבונך מחדש יהיה עליך להזין את כל המידע (מוצרים, תמונות וכו) שנית, מה ברצונך לעשות",
                  <Button
                    variant="danger"
                    onClick={() =>
                      this.props.deleteAccount(this.props.activeAccount.id)
                    }
                  >
                    מחק חשבון
                  </Button>
                );
              }}
            >
              {" "}
              מחיקת חשבון
            </Button>
            <br></br>
            <Button
              variant="danger"
              onClick={() => {
                this.props.openGenericModal(
                  "שים לב!!",
                  "מחיקת משתמש הינה פעולה שלא ניתנת לביטול, במידה ותפתח משתמש נוסף בעתיד לא יהיה ניתן לשייך את המידע של משתמש זה אל המשתמש החדש, מה ברצונך לעשות?",
                  <Button variant="danger" onClick={() => this.deleteMe()}>
                    מחק משתמש
                  </Button>
                );
              }}
            >
              {" "}
              מחיקת משתמש
            </Button>
          </div>
        </>
      );
    } else {
      return <h1>לא נבחר חשבון</h1>;
    }
  }
}
