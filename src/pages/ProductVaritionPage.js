import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Crop from "../components/Crop";
import AddVars from "./addVars";
import QuantityDiscount from "../components/QuantityDiscount";
import { withRouter } from "react-router-dom";
import { domain, handleKeyDown, topFunction } from "../components/utils";
import { de } from "date-fns/locale";

class ProductVaritionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      batch_size: "",
      cost_per_item: "",
      image: "",
      item: "",
      discounts: {},
      variation_key: "",
      variation_value: "",
      amount_in_stock: 0,
      responsData: "",
      priceError: "",
      variationError: "",
      ///////////
      base64: "",
      pictures: [],

      uploadImage: "",
      itemFormData: "",
      newBlob: "",
      varJson: "",
      varCounter: 1,
      varsInfo: "",
      discountCounter: 1,
      isOpen: false,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      image: picture,
    });
  }
  getCropedSizes = (width, height) => {
    this.setState({ width: width, height: height });
  };
  resetPage = (e) => {
    this.setState({
      varCounter:
        Object.keys(this.state.varsInfo).length <= 1
          ? 1
          : Object.keys(this.state.varsInfo).length,
    });
    this.setState({
      discountCounter:
        Object.keys(this.state.discounts).length <= 1
          ? 1
          : Object.keys(this.state.discounts).length,
    });
    this.setState((prevState) => {
      let discounts = Object.assign({}, prevState.discounts); // creating copy of state variable jasper
      // update the name property, assign a new value
      console.log(discounts);
      for (const [key, value] of Object.entries(discounts)) {
        discounts[key] = "0";
        console.log(discounts);

        this.setState({ discounts: discounts });
      }
    });
    this.setState((prevState) => {
      let varsInfo = Object.assign({}, prevState.varsInfo); // creating copy of state variable jasper
      // update the name property, assign a new value
      console.log(varsInfo);
      for (const [key, value] of Object.entries(varsInfo)) {
        varsInfo[key] = "";
        console.log(varsInfo);

        this.setState({ varsInfo: varsInfo });
      }
    });
    this.props.closeGenericModal();
    setTimeout(
      () => (document.body.scrollTop = document.documentElement.scrollTop = 0),
      200
    );

    // Boolean parameter

    // this.setState({
    //   image: "",
    //   varCounter: 1,
    //   discountCounter: 1,
    //   variation_key: "",
    //   variation_value: "",
    //   cost_per_item: "",
    //   amount_in_stock: "",
    //   varJson: "",
    //   batch_size: "",
    //   discounts: {},
    //   newBlob: "",
    //   variation: "",
    //   varsInfo: {},
    //   IsVarButtonDisabled: false,
    //   IsDiscountsButtonDisabled: false,
    // });
  };
  removeVars = (key) => {
    this.setState({
      varsInfo: Object.assign(
        {},
        this.state.varsInfo,
        delete this.state.varsInfo[key]
      ),
    });
  };
  removeDiscount = (key) => {
    this.setState({
      discounts: Object.assign(
        {},
        this.state.discounts,
        delete this.state.discounts[key]
      ),
    });
  };

  addVar = (key, value) => {
    this.setState({ varCounter: this.state.varCounter + 1 });
    // this.setState({ IsVarButtonDisabled: true });
  };
  addDiscount = (key, value) => {
    this.setState({ discountCounter: this.state.discountCounter + 1 });

    this.setState({ IsDiscountsButtonDisabled: true });
  };
  //i want updateobj to update a state object

  updateObj = (key, value) => {
    let obj = {};
    key = key.trim();
    value = value.trim();
    obj[key] = value;

    this.setState({
      varsInfo: Object.assign({}, this.state.varsInfo, { [key]: value }),
    });
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    key = key.trim();
    value = value.trim();
    discounts[key] = value;

    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
  };
  uploadVar = (event) => {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    let DiscountObj = this.state.discounts;
    for (const [key, value] of Object.entries(DiscountObj)) {
      if (value == 0) {
        delete DiscountObj[key];
      }
    }
    let VarObj = this.state.varsInfo;
    for (const [key, value] of Object.entries(VarObj)) {
      if (value === "") {
        delete VarObj[key];
      }
    }

    let discounts = JSON.stringify(DiscountObj);
    let string = JSON.stringify(VarObj);

    let productPost = new FormData();
    productPost.append("cost_per_item", this.state.cost_per_item);
    productPost.append("amount_in_stock", this.state.amount_in_stock);
    productPost.append("batch_size", this.state.batch_size);
    productPost.append("variation", string);
    productPost.append("discounts", discounts);
    productPost.append("description", this.state.description);
    productPost.append("item", this.props.match.params.id); //this.props.CurrentUploadItemId
    if (this.state.newBlob) {
      productPost.append("image", this.state.newBlob, this.state.newBlob.name);
    }

    this.setState({ itemFormData: productPost });
    for (let pair of productPost.entries()) {
    }
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    this.setState({ priceError: "", variationError: "" });

    axios.post(`${domain}/item-variations/`, productPost, config).then(
      (response) => {
        if (response) {
          this.props.openGenericModal(
            "המוצר עלה לאוויר!",
            "מה ברצונך לעשות כעת?",
            <>
              {" "}
              <Button onClick={this.resetPage}>
                {" "}
                להעלות וריאציה נוספת של מוצר זה
              </Button>
              <Button
                onClick={() => {
                  this.props.closeGenericModal();
                  window.location.assign("/#/uploadpage");
                }}
              >
                להעלות מוצר אחר
              </Button>
              <Button
                onClick={() => {
                  this.props.closeGenericModal();
                  window.location.assign("/#/");
                }}
              >
                חזור לעמוד הבית
              </Button>
            </>,
            "prevent"
          );
        }
      },
      (error) => {
        if (!this.state.cost_per_item) {
          this.setState({ priceError: "שדה חובה" });
        }
        if (this.state.cost_per_item) {
          this.setState({
            variationError: "וריאציה זו כבר קיימת",
          });
        }
      }
    );
  };
  updateDiscounts = (key, value) => {
    let discounts = {};
    discounts[key] = value;

    this.setState({
      discounts: Object.assign({}, this.state.discounts, {
        [key]: parseFloat(value),
      }),
    });
  };
  // uploadNRestet = (event) => {
  //   let discounts = JSON.stringify(this.state.discounts);
  //   let string = JSON.stringify(this.state.varsInfo);
  //
  //
  //   let productPost = new FormData();
  //   productPost.append("cost_per_item", this.state.cost_per_item);
  //   productPost.append("amount_in_stock", this.state.amount_in_stock);
  //   productPost.append("batch_size", this.state.batch_size);
  //   productPost.append("variation", string);
  //   productPost.append("discounts", discounts);
  //   productPost.append("item", this.props.CurrentUploadItemId); //this.props.CurrentUploadItemId
  //   if (this.state.newBlob) {
  //     productPost.append("image", this.state.newBlob, this.state.newBlob.name);
  //   }

  //   this.setState({ itemFormData: productPost });
  //   for (let pair of productPost.entries()) {
  //
  //   }
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${this.props.accessToken}`,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   axios.post(`${domain}/item-variations/`, productPost, config).then(
  //     (response) => {
  //       if (response) {
  //         this.resetPage();
  //       }
  //
  //     },
  //     (error) => {
  //
  //     }
  //   );
  // };

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
    this.setState({ pictures: blob });
  };

  // {
  //   "id": 0, !!!!!!!!!
  //   "cost_per_item": 0,
  //   "batch_size": 0,
  //   "amount_in_stock": 0,
  //   "variation": {},
  //   "discounts": {},
  //   "image": "string",
  //   "item": 0
  // }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let card =
      this.props.screenWidth > 580 ? (
        <ProductCard
          closeGenericModal={this.props.closeGenericModal}
          openGenericModal={this.props.openGenericModal}
          pictures={this.state.pictures}
        ></ProductCard>
      ) : (
        <ProductCard
          closeGenericModal={this.props.closeGenericModal}
          openGenericModal={this.props.openGenericModal}
          pictures={this.state.pictures}
        ></ProductCard>
      );
    let varform = [];
    let discounts = [];
    for (let i = 0; i < this.state.varCounter; i++) {
      varform.push(
        <AddVars
          varsInfo={this.state.varsInfo}
          removeVars={this.removeVars}
          varCounter={this.state.varCounter}
          addVar={this.addVar}
          updateObj={this.updateObj}
        ></AddVars>
      );
    }

    for (let i = 0; i < this.state.discountCounter; i++) {
      discounts.push(
        <QuantityDiscount
          discounts={this.state.discounts}
          removeDiscount={this.removeDiscount}
          updateDiscounts={this.updateDiscounts}
          discountCounter={this.state.discountCounter}
          addDiscount={this.addDiscount}
        ></QuantityDiscount>
      );
    }
    return (
      <div className="Uploadpage" id="uploadPage">
        <Container
          onKeyDown={(event) => handleKeyDown(event, this.uploadVar)}
          className="productUploadContainer"
        >
          <h1>צור וריאציה</h1>
          <Form className="varUploadForm">
            <Row>
              <Col xl={6} sm={12}>
                <p className="FormRejects">
                  {" "}
                  {`רוחב - ${this.state.width}  גובה-${this.state.height}`}
                </p>
                <Crop
                  getCropedSizes={this.getCropedSizes}
                  className="cropper"
                  getCropedBlob={this.getCropedBlob}
                  getBase64={this.getBase64}
                ></Crop>
              </Col>
              <Col xl={6}>
                {card}
                <p className="FormRejects"> {this.state.responsData.image}</p>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>תיאור וריאציה (לא פעיל)</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                as="textarea"
                rows={3}
                value={this.state.description}
                placeholder="enter description here..."
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>גודל מנה</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="לדוגמה כפולות של 10"
                value={this.state.batch_size}
                name="batch_size"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>מלאי</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="מלאי..."
                value={this.state.amount_in_stock}
                name="amount_in_stock"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>מחיר</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="number"
                placeholder="unit price"
                value={this.state.cost_per_item}
                name="cost_per_item"
              />
              <p className="FormRejects">{this.state.priceError}</p>
            </Form.Group>

            <Row style={{ padding: "0px 20px 0px 20px" }}>
              {/* <Button
                onClick={this.addVar}
                type="button"
                variant="success"
                disabled={this.state.IsVarButtonDisabled}
              >
                הוסף וריאציה
              </Button> */}
              <p className="FormRejects">{this.state.variationError}</p>
              <Row>
                {" "}
                <Col xl={12}>{varform}</Col>
              </Row>
              {/* <Col xl={2}> */}
              <Row></Row>
              {/* <Button
                onClick={this.addDiscount}
                type="button"
                variant="success"
                disabled={this.state.IsDiscountsButtonDisabled}
              >
                הוסף הנחה
              </Button> */}
              {/* </Col> */}
            </Row>

            <Row>
              <Col xl={12}>{discounts}</Col>
            </Row>

            <Row>
              <Col xl={12}>
                <Button type="button" onClick={this.uploadVar}>
                  שלח
                </Button>
              </Col>
              {/* <Col xl={2}>
                <Button type="button" variant="danger" onClick={this.resetPage}>
                  מחק את הטופס
                </Button>
              </Col> */}
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
export default withRouter(ProductVaritionPage);
