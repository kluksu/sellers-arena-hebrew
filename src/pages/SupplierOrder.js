import axios from "axios";
import React, { Component } from "react";
import OrderInfo from "../components/OrderInfo";
import { withRouter } from "react-router-dom";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { delivered, domain, postData } from "../components/utils";
// import FullPageLoader from "../components/FullPageLoader";
import DiscountModal from "../components/DiscountModal";
import DetailsOnOrderSeller from "../components/DetailsOnOrderSeller";
import detailsOnOrderBuyer from "../components/DetailsOnOrderBuyer";
import DetailsOnOrderBuyer from "../components/DetailsOnOrderBuyer";
import moment from "moment";
import FullPageLoader from "../components/FullPageLoader";

class SupplierOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCart: "",
      declineReason: "",
      discountPrecentage: 0,
      buyer: "",
      isDiscountModalOpen: false,
      orderNotes: "",
      changedQuantities: {},
      modalText: "",
      buyerTaxId: "",
      isStageChangeButtonDisabled: true,
      modalTop: "",
      modalBottom: "",
      activeOrder: {},
      copyOriginal: "",
    };
  }
  activateStageChangesButton = () => {
    this.setState({ isStageChangeButtonDisabled: false });
  };
  closeModal = () => this.setState({ isDiscountModalOpen: false });
  openModal = (top, text, bottom) => {
    this.setState({ modalText: text });
    this.setState({ modalTop: top });
    this.setState({ modalBottom: bottom });

    this.setState({ isDiscountModalOpen: true });
  };
  createDelta = (key, quantity, price) => {
    let changedQuantities = this.state.changedQuantities;

    changedQuantities[key] = {
      quantity: quantity,
      cost_per_item: price,
    };
    this.setState({ changedQuantities: changedQuantities });
  };
  createOrderDiscount = (precentage) => {
    //

    // let discountObj = {};
    // this.state.activeCart.all_item_variations.forEach((CartVariation) => {
    //
    //     CartVariation["item_variation"].cost_per_item * (1 - precentage / 100)
    //   );

    //   discountObj[CartVariation.item_variation.id] = {
    //     cost_per_item:
    //       CartVariation["item_variation"].cost_per_item *
    //       (1 - precentage / 100),
    //     quantity: CartVariation.quantity,
    //   };
    // });
    // let obj = { variations_json: discountObj };

    postData(
      `${domain}/supplier-orders/${this.props.match.params.id}/add_percentage_discount/`,
      {
        discount_percentage: precentage,
      },
      ` ${this.props.accessToken}`
    ).then((data) => {
      if (data.info.includes("successfully")) {
        this.openModal("הצלחה!", "השינויים נוספו בהצלחה");
        this.onSupplierOrderMount();
      }
    });
  };
  submitEdit = () => {
    let freeItemsWarning = "";
    let freeItemsArr = [];
    for (const [key, value] of Object.entries(this.state.changedQuantities)) {
      if (value.cost_per_item == 0) {
        freeItemsArr.push(key);
      }
    }

    freeItemsWarning =
      freeItemsArr.length > 0
        ? `   שים לב, מחירי המוצרים הבאים ירד ל-0 ( ${freeItemsArr})`
        : "";

    let obj = { variations_json: this.state.changedQuantities };

    postData(
      `${domain}/supplier-orders/${this.props.match.params.id}/edit/`,
      obj,
      ` ${this.props.accessToken}`
    ).then((data) => {
      if (data.status.includes("successfully")) {
        this.openModal("השינויים נוספו בהצלחה", `${freeItemsWarning}`);
        this.onSupplierOrderMount();
      }
    });
  };
  editItem = (delta) => {
    if (this.state.activeCart.one_time_discount) {
      this.openModal(
        "שים לב!!",
        "שינוי במוצר בשלב זה יחזיר את ההנחה על כלל ההזמנה ל-0% יש להזין הנחה מחדש לאחר השינוי",
        <Button
          variant="success"
          onClick={() => {
            this.submitEdit();
          }}
        >
          המשך בשינוי
        </Button>
      );
    } else {
      this.submitEdit();
    }
  };

  printOrder = async (minuts, hour) => {
    this.setState({
      timeCapture: `${minuts.length < 2 ? 0 + minuts : minuts}: ${hour}`,
    });
    await this.setState({ copyOriginal: " תעודת משלוח - העתק" });
    window.print();
    await this.setState({ copyOriginal: "תעודת משלוח - מקור " });

    window.print();
  };
  acceptAbortOrder = (reject, approve) => {
    let rejectOrApprove = reject !== "" ? "approv" : "reject";
    postData(
      `${domain}/supplier-orders/${this.props.match.params.id}/${approve}${reject}/`,
      { reason: this.state.declineReason },
      ` ${this.props.accessToken}`
    ).then((data) => {
      if (data && data.info && data.info.includes("successfully")) {
        // this.props.history.push("");

        this.props.openGenericModalOrderSummery();
      } else {
        this.openModal(
          "אזהרה!",
          <>
            "אתה עומד לדחות את ההזמנה, מה ברצונך לעשות?"
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label className="no-print">
                {" "}
                אם את דוחה את הזמנה זו בבקשה ספק סיבה ללקוח{" "}
              </Form.Label>
              <Form.Control
                className="no-print lowerForms rejectOrderForm"
                onChange={this.handleChange}
                placeholder="add notes here..."
                as="textarea"
                name="declineReason"
              ></Form.Control>
            </Form.Group>
            <p className="FormRejects">בבקשה ספק סיבה</p>
          </>,
          <Button
            className="  no-print"
            variant="danger"
            onClick={() => this.acceptAbortOrder("", "reject")}
          >
            {" "}
            דחה הזמנה
          </Button>
        ); //creat a warning for not filling all fields
      }
      this.props.getAllOrders();
    });
    // window.location.replace("/#/")
  };
  // addDiscount = (rate) => {
  //   postData(
  //     `${domain}/supplier-orders/${this.props.match.params.id}/add_percentage_discount/`,
  //     {
  //       discount_percentage: this.state.discountPrecentage,
  //     },
  //     ` ${this.props.accessToken}`
  //   ).then((data) => {
  //
  //     if (data.info.includes("successfully")) {
  //       this.openModal("discount was");

  //       this.getSupplierOrder("cart_snapshot").then((data) => {
  //
  //         let snapShot = snapShotPath;
  //         this.getBuyerDits(data.data.cart_snapshot.buyer_account);
  //         this.setState({ activeCart: data.data[snapShot] });
  //       });
  //     }
  //   });
  // };
  getBuyerDits = (buyerId) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    if (
      this.state.activeCart.seller_account !==
      this.state.activeCart.buyer_account
    ) {
      return axios
        .get(`${domain}/public-accounts/${buyerId}`, config)
        .then((data) => {
          this.setState({ buyer: data.data });
        });
    } else {
      return axios
        .get(`${domain}/unregistered-accounts/${buyerId}`, config)
        .then((res) => {
          this.setState({ buyer: res.data });
        });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({ changedQuantities: {} });
      this.onSupplierOrderMount();
    }
    if (this.state.activeCart.id !== prevState.activeCart.id) {
      this.onSupplierOrderMount();
    }
    if (this.props.accessToken !== prevProps.accessToken) {
      this.onSupplierOrderMount();
    }
  }
  onSupplierOrderMount = () => {
    this.getSupplierOrder().then((data) => {
      let buyerTaxId = data.data.buyer_account.tax_id;
      this.setState({ buyerTaxId: buyerTaxId });
      this.setState({ activeCartStatus: data.data.order_status });

      this.setState({ activeOrder: data.data });
      let snapShot = data.data["seller_edited_snapshot"]
        ? data.data["seller_edited_snapshot"]
        : data.data["cart_snapshot"];

      this.setState({ activeCart: snapShot });

      if (
        this.state.activeCart.seller_account !==
        this.state.activeCart.buyer_account
      ) {
        this.getBuyerDits(data.data.cart_snapshot.buyer_account);
      } else {
        this.getBuyerDits(data.data.buyer_unregistered_account);
      }
    });
    this.props.getCarts();
  };
  componentDidMount() {
    this.onSupplierOrderMount();
  }
  getSupplierOrder = (snapShotPath) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios.get(
      `${domain}/supplier-orders/${this.props.match.params.id}`,
      config
    );
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const d = new Date();
    let hour = d.getHours();
    let seconds = d.getSeconds();
    let minuts = d.getMinutes();

    let rejectbutton = (
      <Button
        className="no-print "
        // onClick={() => this.acceptAbortOrder("", "reject")}
        onClick={() =>
          this.openModal(
            "שים לב!",
            <>
              "אתה עומד לדחות את ההזמנה, מה ברצונך לעשות?"
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="no-print">
                  {" "}
                  אם אתה דוחה את הזמנה זו בבקשה ספק סיבה{" "}
                </Form.Label>
                <Form.Control
                  className="no-print lowerForms rejectOrderForm"
                  onChange={this.handleChange}
                  placeholder="add notes here..."
                  as="textarea"
                  name="declineReason"
                ></Form.Control>
              </Form.Group>
            </>,
            <Button
              className="  no-print"
              variant="danger"
              onClick={() => this.acceptAbortOrder("", "reject")}
            >
              {" "}
              דחה
            </Button>
          )
        }
        className="  no-print"
        type="button"
        variant="danger"
      >
        דחה הזמנה
      </Button>
    );
    // let headlineSize = this.props.screenWidth > 650 ? "60px" : "20px";

    let isChangable = this.state.activeCartStatus !== "filled" ? true : false;
    let discountForm =
      this.state.activeCartStatus === "submitted" ||
      this.state.activeCartStatus === "seller_approved" ? (
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="no-print"> precentage discount</Form.Label>
            <Form.Control
              className="no-print lowerForms"
              onChange={this.handleChange}
              placeholder="0"
              step="1"
              type="number"
              name="discountPrecentage"
            ></Form.Control>
          </Form.Group>
        </Form>
      ) : null;

    let buttons = "";
    if (this.state.activeCartStatus === "submitted") {
      buttons = (
        <>
          <Button
            type="button"
            className="  no-print"
            variant="success"
            onClick={() =>
              this.openModal(
                "שים לב!",
                `  אתה עומד להעניק הנחה בגובה ${this.state.discountPrecentage}% האם להמשיך? `,
                <Button
                  className="  no-print"
                  variant="success"
                  onClick={() =>
                    this.createOrderDiscount(this.state.discountPrecentage)
                  }
                >
                  אישור
                </Button>
              )
            }
          >
            הוסף הנחה
          </Button>
          <Row></Row>

          <Button
            className="no-print"
            onClick={() => this.acceptAbortOrder("approve", "")}
            type="button"
            variant="primary"
          >
            אשר הזמנה
          </Button>
          {rejectbutton}
        </>
      );
    } else if (this.state.activeCartStatus === "seller_approved") {
      buttons = (
        <>
          <Button
            className="w-70  no-print"
            variant="success"
            onClick={() =>
              this.createOrderDiscount(this.state.discountPrecentage)
            }
          >
            הוסף הנחה
          </Button>
          <Row></Row>
          <Button
            className="no-print "
            onClick={() =>
              this.props.markOrderAs(this.props.match.params.id, delivered)
            }
            type="button"
            variant="primary"
          >
            סמן כנשלח
          </Button>
          {rejectbutton}
          {/* <Button
            className="no-print "
            onClick={() => this.acceptAbortOrder("", "reject")}
            type="button"
            variant="danger"
          >
            decline order
          </Button> */}
        </>
      );
    } else if (this.state.activeCartStatus === "filled") {
      buttons = (
        <>
          <Button
            // style={{ marginBottom: "39px" }}
            className="no-print "
            onClick={() =>
              this.props.markOrderAs(this.props.match.params.id, "payed")
            }
            type="button"
            variant="primary"
          >
            סמן כשולם
          </Button>
        </>
      );
    }

    // if (
    //   !this.state.activeCart ||
    //   !this.props.accessToken ||
    //   !this.props.accessToken
    // ) {
    //   return <FullPageLoader></FullPageLoader>;
    // }

    let buyeraddress = "";
    if (this.state.buyer) {
      buyeraddress = this.state.buyer.store_address;
      buyeraddress = buyeraddress.replaceAll(" ", "20%");
    }
    if (this.state.activeCart !== "" && this.props.activeAccount) {
      return (
        <div className="OrderSummeryPage">
          <h1 className="printOnly"> {this.state.copyOriginal}</h1>
          <Button
            // style={{ display: this.props.screenWidth > 650 ? "" : "none" }}
            className="printButton no-print "
            onClick={() => this.printOrder(minuts, hour)}
            type="button"
          >
            הדפס תעודת משלוח
          </Button>
          <Container className="orderSummeryContainer">
            <DetailsOnOrderSeller
              activeAccount={this.props.activeAccount}
              orderID={this.props.match.params.id}
              activeOrder={this.state.activeOrder}
              activeCartStatus={this.props.activeCartStatus}
            ></DetailsOnOrderSeller>
            <div className="printOnly">
              שעת הפקת התעודה: {this.state.timeCapture}
            </div>
            <OrderInfo
              screenWidth={this.props.screenWidth}
              activateStageChangesButton={this.activateStageChangesButton}
              orderID={this.props.match.params.id}
              onSupplierOrderMount={this.onSupplierOrderMount}
              changedQuantities={this.state.changedQuantities}
              createDelta={this.createDelta}
              isChangable={isChangable}
              accessToken={this.props.accessToken}
              activeAccount={this.props.activeAccount}
              activeCart={this.state.activeCart}
            ></OrderInfo>
            {this.state.activeCartStatus !== "filled" ? (
              <Button
                className=" printButton no-print"
                onClick={this.editItem}
                disabled={this.state.isStageChangeButtonDisabled}
              >
                שמור שינויים
              </Button>
            ) : null}
            <DetailsOnOrderBuyer buyer={this.state.buyer}></DetailsOnOrderBuyer>

            <div>מקבל הסחורה____________________ חתימה___________________</div>
            {/* <div className="sellerInfoContainer">
              <span style={{ fontSize: headlineSize }}>
                {" "}
                {this.state.buyer.name}
              </span>
              <div>
                {" "}
                <span>
                  {this.state.buyer.store_address}{" "}
                  {this.state.buyer.phone_number}{" "}
                </span>
              </div>

              <div> {`ח"פ:${this.state.buyer.tax_id}  `}</div>
            </div> */}

            <div className="directions no-print">
              <a
                href={`https://waze.com/ul?q=${this.state.buyer.store_address}`}
              >
                <img src="data:image/jpeg;base64,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"></img>
              </a>
              <a
                href={`https://google.com/maps?q=${this.state.buyer.store_address}`}
              >
                {" "}
                <img src="https://logos-download.com/wp-content/uploads/2016/05/Google_Maps_logo_wordmark.png"></img>
              </a>
            </div>

            {discountForm}
            {buttons}
          </Container>
          <DiscountModal
            bottom={this.state.modalBottom}
            top={this.state.modalTop}
            text={this.state.modalText}
            closeModal={this.closeModal}
            isDiscountModalOpen={this.state.isDiscountModalOpen}
          ></DiscountModal>
        </div>
      );
    } else return <FullPageLoader></FullPageLoader>;
  }
}
export default withRouter(SupplierOrder);
