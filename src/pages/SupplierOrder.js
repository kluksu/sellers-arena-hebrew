import axios from "axios";
import React from "react";
import OrderInfo from "../components/OrderInfo";
import { withRouter } from "react-router-dom";
import { Button, Form, Container, Row } from "react-bootstrap";
import { delivered, domain, postData } from "../components/utils";
import FullPageLoader from "../components/FullPageLoader";
import DiscountModal from "../components/DiscountModal";
import DetailsOnOrderSeller from "../components/DetailsOnOrderSeller";
import DetailsOnOrderBuyer from "../components/DetailsOnOrderBuyer";

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
                <Form.Label>
                  {" "}
                  אם אתה דוחה את הזמנה זו בבקשה ספק סיבה{" "}
                </Form.Label>
                <Form.Control
                  className=" lowerForms rejectOrderForm"
                  onChange={this.handleChange}
                  placeholder="add notes here..."
                  as="textarea"
                  name="declineReason"
                ></Form.Control>
              </Form.Group>
            </>,
            <Button
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

    if (
      !this.state.activeCart ||
      !this.props.accessToken ||
      !this.props.accessToken
    ) {
      return <FullPageLoader></FullPageLoader>;
    } else {
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
              style={{ display: this.props.screenWidth > 650 ? "'" : "none" }}
              className="printButton no-print "
              onClick={() => this.printOrder(minuts, hour)}
              type="button"
            >
              הדפס תעודת משלוח
            </Button>
            <Container fluid className="orderSummeryContainer">
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
              <DetailsOnOrderBuyer
                buyer={this.state.buyer}
              ></DetailsOnOrderBuyer>

              <div>
                מקבל הסחורה____________________ חתימה___________________
              </div>
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
                  סע עם Waze
                </a>
                <a
                  href={`https://google.com/maps?q=${this.state.buyer.store_address}`}
                >
                  {" "}
                  <img
                    src="https://logos-download.com/wp-content/uploads/2016/05/Google_Maps_logo_wordmark.png"
                    alt="google maps logo"
                  ></img>
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
      } else return null;
    }
  }
}
export default withRouter(SupplierOrder);
