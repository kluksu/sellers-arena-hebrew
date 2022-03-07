import React, { Component } from "react";
import { Button, Container, Form, FormLabel, Row } from "react-bootstrap";
import {
  categoriesAndSubCategories,
  categoriesList,
  domain,
  handleKeyDown,
  hebrewCategoriesAndSubCategories,
  postData,
  sendEmailToMe,
  takeMeHome,
} from "../components/utils";
import Recaptcha from "react-recaptcha";
import Crop from "../components/Crop";
import axios from "axios";
import { object } from "prop-types";

export default class OpenAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      store_address: "",
      tax_id: "",
      phone_number: "",
      country: "",
      language: "",

      account_type: this.props.href !== "" ? 2 : "",
      responseData: "",
      category: "",
      captchaError: "",
      image: "",
    };
  }
  // }{
  //   "name": "string",
  //   "store_address": "string",
  //   "tax_id": "string",
  //   "phone_number": "string",
  //   "is_active": true,
  //   "account_type": 0
  // ${domain}/
  creatAccount = (event) => {
    window.scrollTo(0, 0);

    let fields = [
      "name",
      "store_address",
      "tax_id",
      "account_type",
      "phone_number",
      "category",
      "country",
      "language",
    ];
    if (
      this.state.name !== "" &&
      this.state.store_address !== "" &&
      this.state.tax_id !== "" &&
      (this.state.account_type == 2 || this.state.account_type == 3) &&
      this.state.phone_number !== "" &&
      this.state.category !== "" &&
      this.state.country !== "" &&
      this.state.language !== ""
    ) {
      if (this.props.isRealUser || window.location.href.includes("localhost")) {
        // this.setState({discounts: Object.assign(  this.state.newDIscount)} )
        // this.setState({
        //   varsInfo: Object.assign(Object.entries(this.state.newVariations)),
        // });
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
          accountInfo.append(
            "image",
            this.state.newBlob,
            this.state.newBlob.name
          );
        }

        this.setState({ itemFormData: accountInfo });

        const config = {
          headers: {
            Authorization: `Bearer ${this.props.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(`${domain}/my-accounts/`, accountInfo, config)
          .then((data) => {
            console.log(data);
            this.setState({ responseData: data });
            this.props.goToNewAccount(data);
            if (data.data.id) {
              sendEmailToMe(
                data.name,
                data.email,
                data.phone_number,
                `${data.id} is asking to open an account`,
                "new account",
                "template_bnhobxj",
                this.props.captchaResponse
              );
              this.props.openGenericModal(
                "החשבון נוצר",
                "כעת יש לחכות לאישור מפעילי האתר על מנת להשתמש בחשבון, אם ישנה בעיה נא לפנות אלינו דרך עמוד צור קשר"
              );
              window.location.assign("/#/");
            }
          })
          .catch((error) => {
            console.log(error.response);
            Object.entries(error.response.data).forEach((field) => {
              this.setState({ [`${field[0]}_error`]: field[1] });
            });
          });
      } else {
        this.setState({ captchaError: "בבקשה אשר שאינך רובוט" });
      }
    } else {
      fields.forEach((field) => {
        if (
          this.state[field] === "" ||
          (field === "account_type" &&
            this.state[field] !== 3 &&
            this.state[field] !== 2)
        ) {
          this.setState({
            [`${field}_error`]: "בבקשה למלא את השדה בצורה נכונה",
          });
        }
      });
    }
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
  getCropedBlob = (blob) => {
    this.setState({ image: blob });
  };
  getCropedSizes = (width, height) => {
    this.setState({ width: width, height: height });
  };
  // creatAccount = () => {
  //   if (this.props.isRealUser) {
  //     postData(
  //       `${domain}/my-accounts/`,
  //       {
  //         name: this.state.name,
  //         store_address: this.state.address,
  //         tax_id: this.state.taxID,
  //         // is_active: true,
  //         account_type: this.state.accountType,
  //         phone_number: this.state.phone,
  //         category: this.state.category,
  //         country: this.state.country,
  //         language: this.state.language,
  //       },
  //       ` ${this.props.accessToken}`
  //     ).then((data) => {
  //       this.setState({ responseData: data });
  //       this.props.goToNewAccount(data);
  //       if (data.id) {
  //         sendEmailToMe(
  //           data.name,
  //           data.email,
  //           data.phone_number,
  //           `${data.id} is asking to open an account`,
  //           "new account",
  //           "template_bnhobxj",
  //           this.props.captchaResponse
  //         );
  //         window.location.assign("/#/");
  //       }
  //     });
  //   } else {
  //     this.setState({ captchaError: "בבקשה אשר שאינך רובוט" });
  //   }
  // };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({
      [`${event.target.name}_error`]: "",
    });
  };

  render() {
    console.log(this.state.account_type);
    let accountType = this.props.href ? (
      ""
    ) : (
      <>
        {" "}
        <Form.Group>
          <FormLabel>סוג חשבון</FormLabel>
          <Form.Control
            onChange={this.handleChange}
            size="md"
            as="select"
            name="account_type"
          >
            <option value={""}>-------</option>
            <option value={3}>ספק</option>
            <option value={2}>קימונאי</option>
          </Form.Control>
        </Form.Group>
        <p className="FormRejects">
          {/* {this.state.responseData.account_type ? "שדה חובה" : ""} */}
        </p>{" "}
        <p className="FormRejects">{this.state.account_type_error}</p>
      </>
    );
    let mainCategoryArr = [];

    categoriesAndSubCategories.forEach((category) => {
      mainCategoryArr.push(
        <option value={Object.keys(category)}>{Object.keys(category)}</option>
      );
    });
    return (
      <div className="registerPage">
        <Container
          onKeyDown={(event) => handleKeyDown(event, this.creatAccount)}
          className="registerContainer"
        >
          <Form>
            <p className="info-p-registerContainer">
              כאן עליך למלא מידע אודות העסק שלך <br></br>
              המידע הזה ישמש בעסקאות עתידיות שיעשו באתר<br></br>
              תוכל לשנות מידע זה בעתיד אך מומלץ להזין אותו עכשיו <br></br>
              כך תיחשף לתכנים רבים יותר שיש לאתר להציע.
            </p>
            <p>{this.state.detail_error}</p>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>שם העסק</Form.Label>
              <Form.Control
                className="formValid"
                onChange={this.handleChange}
                type="text"
                name="name"
                required
                placeholder="name.."
              />
              {/* <Crop></Crop> */}
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.name}</p>
            <p className="FormRejects">{this.state.name_error}</p>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>כתובת</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder={"store_address"}
                name="store_address"
              />
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.store_address}
            </p>
            <p className="FormRejects">{this.state.store_address_error}</p>
            <Form.Group controlId="formGroupRepetPassword">
              <Form.Label> ח"פ</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="tax id"
                name="tax_id"
              />
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.tax_id}</p>
            <p className="FormRejects">{this.state.tax_id_error}</p>
            <Form.Group controlId="formGroupPhoneNumber">
              <Form.Label> טלפון</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="text"
                placeholder="xxx-xxxxxxx"
                name="phone_number"
              />
            </Form.Group>
            <p className="FormRejects">
              {this.state.responseData.phone_number}
            </p>{" "}
            <p className="FormRejects">{this.state.phone_number_error}</p>
            {accountType}{" "}
            <Form.Group>
              <FormLabel>קטגוריית חנות</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="category"
              >
                <option value={""}>----------</option>
                {mainCategoryArr}
              </Form.Control>
            </Form.Group>
            <p className="FormRejects">{this.state.responseData.category}</p>
            <p className="FormRejects">{this.state.category_error}</p>
            <Form.Group>
              <FormLabel>שפה</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="language"
              >
                <option value={""}>----------</option>
                <option value="hebrew">עברית</option>
                {/* <option value="english">english</option> */}
              </Form.Control>
              <p className="FormRejects">{this.state.language_error}</p>
            </Form.Group>
            <Form.Group>
              <FormLabel>מדינה</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="country"
              >
                <option value={""}>----------</option>
                <option value="israel">Israel</option>
                {/* <option value="USA">USA</option> */}
              </Form.Control>
              <p className="FormRejects">{this.state.country_error}</p>
            </Form.Group>
            לוגו{" "}
            <Crop
              getCropedSizes={this.getCropedSizes}
              className="cropper "
              getCropedBlob={this.getCropedBlob}
              getBase64={this.getBase64}
            ></Crop>
            <p className="FormRejects">{this.state.image_error}</p>
          </Form>
          <br></br>
          <Recaptcha
            sitekey="6LeVP1MdAAAAAIiCocQV_iqctlgartuvAu9LHfn8"
            render="explicit"
            onloadCallback={this.props.reCaptchaLoded}
            verifyCallback={this.props.verifyCallback}
          />
          <p className="FormRejects">{this.state.captchaError}</p>
          <Button onClick={this.creatAccount} type="button">
            {" "}
            שלח
          </Button>
        </Container>
      </div>
    );
  }
}
