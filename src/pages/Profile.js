import axios from "axios";
import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Crop from "../components/Crop";
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
      store_address: "",
      phone_number: "",
      messages: "",
      category: "",
      error: {},
      userError: {},
      user_phone_number: "",
      last_name: "",
      first_name: "",
      email: "",
      image: "",
    };
  }
  getCropedSizes = (width, height) => {
    this.setState({ width: width, height: height });
  };
  getBase64 = (base64) => {
    this.setState({ newBlob: base64 });

    const getInfo = (image) => {
      this.setState({ uploadImage: image });
    };
    let reader = new FileReader();
    reader.readAsDataURL(base64);
    reader.onloadend = function () {
      let base64data = reader.result;
      getInfo(base64data);
    };
  };
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
        "Content-Type": "multipart/form-data",
      },
    };
    let accountInfo = new FormData();

    accountInfo.append("name", this.state.name);
    accountInfo.append("store_address", this.state.store_address);
    accountInfo.append("tax_id", this.state.tax_id);
    accountInfo.append("account_type", this.state.account_type);
    accountInfo.append("phone_number", this.state.phone_number);
    accountInfo.append("category", this.state.category);
    accountInfo.append("country", this.state.country); //this.props.CurrentUploadItemId
    accountInfo.append("language", this.state.language); //this.props.CurrentUploadItemId
    // accountInfo.append("image", this.state.image); //this.props.CurrentUploadItemId
    if (this.state.newBlob) {
      console.log(this.state.newBlob);
      accountInfo.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: accountInfo });

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${this.props.accessToken}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    axios
      .patch(
        `${domain}/${this.props.path ? this.props.path : "my-accounts"}/${
          this.props.accountToEdit.id
        }/`,

        accountInfo,
        // name: this.state.name,
        // store_address: this.state.address,
        // tax_id: this.state.tax_id,
        // phone_number: this.state.phone_number,
        // is_active: this.state.is_active,
        // account_type: this.props.accountToEdit.account_type,
        // category: this.state.category,
        // //   messages:
        // //     this.state.messages == ""
        // //       ? this.props.accountToEdit.messages
        // //       : this.state.messages,
        // country: this.props.accountToEdit.country,
        // language: this.props.accountToEdit.language,

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
      this.props.accountToEdit !== prevProps.accountToEdit ||
      (!prevProps.accountToEdit && this.props.accountToEdit)
    ) {
      this.setState({
        tax_id: this.props.accountToEdit.tax_id,
        name: this.props.accountToEdit.name,
        store_address: this.props.accountToEdit.store_address,
        phone_number: this.props.accountToEdit.phone_number,
        messages: this.props.accountToEdit.messages,
        category: this.props.accountToEdit.category,
        is_active: this.props.accountToEdit.is_active,
        country: this.props.accountToEdit.country,
        language: this.props.accountToEdit.language,
      });
      if (
        this.props.userToEdit.id !== prevProps.userToEdit.id ||
        (this.props.userToEdit && !prevProps.userToEdit)
      ) {
        this.setState({
          email: this.props.userToEdit.email,
          first_name: this.props.userToEdit.first_name,
          last_name: this.props.userToEdit.last_name,
          user_phone_number: this.props.userToEdit.phone_number,
        });
      }
      // <div>{`אימייל:${this.props.userToEdit.email}`}</div>
      // <div>{`שם:${this.props.userToEdit.first_name}`}</div>
      // <div>{`שם משפחה:${this.props.userToEdit.last_name}`}</div>
      // <div>{`מספר משתמש:${this.props.userToEdit.id}`}</div>
      // <div>{`טלפון משתמש :${this.props.userToEdit.phone_number}`}</div>
    }
  };
  getCropedBlob = (blob) => {
    this.setState({ image: blob });
  };
  componentDidMount = () => {
    if (this.props.accountToEdit) {
      this.setState({
        tax_id: this.props.accountToEdit.tax_id,
        name: this.props.accountToEdit.name,
        store_address: this.props.accountToEdit.store_address,
        phone_number: this.props.accountToEdit.phone_number,
        messages: this.props.accountToEdit.messages,
        category: this.props.accountToEdit.category,
        is_active: this.props.accountToEdit.is_active,
        country: this.props.accountToEdit.country,
        language: this.props.accountToEdit.language,
      });
      if (this.props.userToEdit) {
        this.setState({
          email: this.props.userToEdit.email,
          first_name: this.props.userToEdit.first_name,
          last_name: this.props.userToEdit.last_name,
          user_phone_number: this.props.userToEdit.phone_number,
        });
      }
    }
  };
  render() {
    console.log(this.props.userToEdit, this.props.accountToEdit);
    let showCategories = [];
    categoriesAndSubCategories.forEach((category) => {
      showCategories.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });
    if (this.props.accountToEdit) {
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
                  onClick={() =>
                    this.props.resetPassword(this.props.userToEdit.email)
                  }
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
                    name="store_address"
                    onChange={this.handleChange}
                    value={`${this.state.store_address}`}
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

                  <p className="FormRejects">{this.state.error.category}</p>
                  {this.props.activeAccount.id !==
                  this.props.accountToEdit.id ? (
                    <>
                      {" "}
                      <Form.Label> האם החשבון פעיל</Form.Label>
                      <Form.Control
                        onChange={this.handleChange}
                        as="select"
                        name="is_active"
                      >
                        <option value={this.state.is_active ? true : false}>
                          {this.state.is_active ? "פעיל" : "לא פעיל"}
                        </option>
                        <option value={this.state.is_active ? false : true}>
                          {this.state.is_active ? "לא פעיל" : "פעיל"}
                        </option>
                      </Form.Control>
                    </>
                  ) : (
                    ""
                  )}

                  <p className="FormRejects">{this.state.error.is_active}</p>
                </Form.Group>
                <Crop
                  getCropedSizes={this.getCropedSizes}
                  className="cropper"
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Form>{" "}
              <div>{`סוג חשבון : ${this.props.accountToEdit.account_type}`}</div>
              <div>{`מדינה : ${this.props.accountToEdit.country}`}</div>
              <div>{`מספר חשבון :  ${this.props.accountToEdit.id}`}</div>
              {/* <div>{` האם פעיל :  ${
                this.props.accountToEdit.is_active ? "פעיל" : "לא פעיל"
              }`}</div> */}
              <div>{`שפה : ${this.props.accountToEdit.language}`}</div>
              <Button onClick={this.submitAccountChanges} type="button">
                עדכן פרטי חשבון
              </Button>
              {this.props.userToEdit.id ? (
                <>
                  <h1> פרטי משתמש</h1>
                  <div>{`מספר משתמש:${this.props.userToEdit.id}`}</div>
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
                  <p className="FormRejects">
                    {this.state.userError.first_name}
                  </p>
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
                  <p className="FormRejects">
                    {this.state.userError.last_name}
                  </p>
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
                  <p className="FormRejects">
                    {this.state.userError.phone_number}
                  </p>
                  <Button onClick={this.submitUserChanges}>
                    שמור פרטי משתמש
                  </Button>
                </>
              ) : (
                ""
              )}
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
                    onClick={() => {
                      this.props.deleteAccount(this.props.accountToEdit.id);
                    }}
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
            {this.props.userToEdit.id ? (
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
            ) : (
              ""
            )}
          </div>
        </>
      );
    } else {
      return <h1>לא נבחר חשבון</h1>;
    }
  }
}
