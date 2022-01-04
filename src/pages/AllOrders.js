import axios from "axios";
import { get } from "lodash";
import React, { Component } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import DetailsOnOrderSeller from "../components/DetailsOnOrderSeller";
import MyDateRange from "../components/MyDateRange";
import { domain } from "../components/utils";
import OrderSummery from "./OrderSummery";

class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrdersStatus: "",
      paymentStatus: "",
      madeBy: "",
      MySupplierOrders: [],
      sellerApprovedOrders: [],
      fulfilledOrders: [],
      payedOrders: [],
      selectedUser: "",
      activeOrders: [],
      startDate: new Date(),
      endDate: new Date(),
      selectedAccountID: "",
      fromTodate: "",
      paid: "",
      unpaid: "",
    };
  }
  handleSelect = (ranges) => {
    this.setState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };
  getFilteredOrders = (status, startDate, endDate, otherAccount) => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    // status = `order_status=${status}`;
    // startDate = `&submitted_at__gte${startDate}`;
    // endDate = `&submitted_at__lte${endDate}`;
    // otherAccount =
    //   this.props.activeAccount && this.props.activeAccount.account_type == 3
    //     ? `&buyer_account${otherAccount}`
    //     : `&seller_account${otherAccount}`;

    let path =
      this.props.activeAccount.account_type == 2
        ? "my-account-orders"
        : "supplier-orders";
    let buyerOrSeller =
      this.props.activeAccount.account_type == 3
        ? `&buyer_account=${this.state.selectedAccountID}`
        : `&seller_account=${this.state.selectedAccountID}`;
    let newEndDate = new Date();
    newEndDate.setDate(endDate.getDate() + 1);
    let newStartDate = new Date();
    newStartDate.setDate(startDate.getDate() + 1);

    endDate = `${JSON.stringify(newEndDate).substring(1, 11)}`;
    startDate = `${JSON.stringify(startDate).substring(1, 11)}`;
    this.setState({ fromTodate: `${startDate} - ${endDate}` });

    axios
      .get(
        `${domain}/${path}/?&submitted_at__gte=${startDate}T23%3a59%3a59&submitted_at__lte=${endDate}T00%3a00%3a00&order_status=${status}${buyerOrSeller}&payment_status=${this.state.paymentStatus}`,
        config
      )
      .then((data) => {
        if (data.status == 200) {
          this.setState({ activeOrders: data.data.results });
          //
          // this.setState({ [state]: data.data.results });
        }
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.paymentStatus !== prevState.paymentStatus) {
    }
    if (this.state.selectedAccountID !== prevState.selectedAccountID) {
      this.props.getAccount(this.state.selectedAccountID).then((res) => {
        this.setState({ selectedAccount: res.data });
      });
    }
    if (
      this.state.selectedAccountID !== prevState.selectedAccountID ||
      this.state.endDate !== prevState.endDate ||
      this.state.startDate !== prevState.startDate ||
      this.state.selectedOrdersStatus !== prevState.selectedOrdersStatus ||
      this.state.paymentStatus !== prevState.paymentStatus
    ) {
      this.getFilteredOrders(
        this.state.selectedOrdersStatus,
        this.state.startDate,
        this.state.endDate,
        this.state.selectedAccountID
      );
    }
    // if (this.state.selectedOrdersStatus !== prevState.selectedOrdersStatus) {
    //
    //   this.chooseOrdersStatus();
    // }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // chooseOrdersStatus = () => {
  //   if (this.state.selectedOrdersStatus === "all") {
  //     this.setState({
  //       activeOrders: this.props.MySupplierOrders.concat(
  //         this.props.fulfilledOrders.concat(this.props.sellerApprovedOrders)
  //       ),
  //     });
  //   } else {
  //     this.setState({
  //       activeOrders: this.props[this.state.selectedOrdersStatus],
  //     });
  //   }
  // };
  onMount = () => {};
  render() {
    let totalSumBefore = 0;
    let totalSumAfter = 0;
    let contactsArr = [];
    if (this.props.myContacts && this.props.myContacts.results) {
      this.props.myContacts.results.forEach((contact) => {
        contactsArr.push(
          <option value={contact.account_contact.id}>
            {contact.account_contact.name}
          </option>
        );
      });
    }

    let myUsersIDs = this.props.myUsers
      ? this.props.myUsers.map((user) => {
          return user.id;
        })
      : null;

    let fillterdBymadeBy = [];

    this.state.activeOrders.forEach((order) => {
      if (
        this.props.activeAccount.account_type == 2 &&
        this.state.madeBy === "buyer" &&
        myUsersIDs.includes(order.user)
      ) {
        fillterdBymadeBy.push(order);
      } else if (
        this.props.activeAccount.account_type == 3 &&
        this.state.madeBy === "seller" &&
        myUsersIDs.includes(order.user)
      ) {
        fillterdBymadeBy.push(order);
      } else if (
        this.props.activeAccount.account_type == 2 &&
        this.state.madeBy === "seller" &&
        !myUsersIDs.includes(order.user)
      ) {
        fillterdBymadeBy.push(order);
      } else if (
        this.props.activeAccount.account_type == 3 &&
        this.state.madeBy === "buyer" &&
        !myUsersIDs.includes(order.user)
      ) {
        fillterdBymadeBy.push(order);
      } else if (this.state.madeBy === "") {
        fillterdBymadeBy.push(order);
      }
    });
    let contectsObj = {};
    fillterdBymadeBy.forEach((order) => {
      let account =
        this.props.activeAccount == 2
          ? order.seller_account
          : order.buyer_account;
      if (!contectsObj[account.id]) {
        contactsArr.push(<option value={account.id}>{account.name}</option>);
        contectsObj[account.id] = account.name;
      }
    });

    ////////////////////////////////////////////////////////////////////
    let orders = fillterdBymadeBy.map((order) => {
      let orderSumBefore =
        order.seller_edited_snapshot !== null
          ? order.seller_edited_snapshot.total_price_before_tax
          : order.cart_snapshot.total_price_before_tax;
      totalSumBefore = totalSumBefore + orderSumBefore;
      let orderSum =
        order.seller_edited_snapshot !== null
          ? order.seller_edited_snapshot.total_price_after_tax
          : order.cart_snapshot.total_price_after_tax;
      totalSumAfter = totalSumAfter + orderSum;

      return (
        <tr
          onClick={() => {
            this.props.history.push(
              this.props.activeAccount.account_type == 3
                ? `supplier-order/${order.id}`
                : `my-order/${order.id}`
            );
          }}
        >
          <td className="">{order.id}</td>
          <td>
            {" "}
            {`${order.submitted_at.replace("T", " ").slice(0, 19)}    `} {}
          </td>
          <td>{order.order_status}</td>
          <td>{order.payment_status}</td>
          <td>{order.user}</td>
          <td>
            {this.props.activeAccount &&
            this.props.activeAccount.account_type == 3
              ? order.buyer_account.name
              : order.seller_account.name}
          </td>
          <td>{orderSumBefore}</td>
          <td>{orderSum}</td>
        </tr>
      );
    });
    return (
      <div className="allOrdersPage">
        {/* payedOrders={this.state.payedOrders}
              fulfilledOrders={this.state.fulfilledOrders}
              sellerApprovedOrders={this.state.sellerApprovedOrders}
              MySupplierOrders={this.state.MySupplierOrders} */}{" "}
        <div className="allOrdersPageForms">
          <MyDateRange
            handleSelect={this.handleSelect}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          ></MyDateRange>
          <Form.Group
            className="no-print"
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Control
              aria-label="Default select example"
              onChange={this.handleChange}
              name="selectedAccountID"
              as="select"
            >
              <option value={""}>
                כל{" "}
                {this.props.activeAccount &&
                this.props.activeAccount.account_type == 3
                  ? "החנויות"
                  : "הספקים"}{" "}
              </option>
              {contactsArr}
            </Form.Control>
          </Form.Group>
          <Form.Group
            className="no-print"
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Control
              aria-label="Default select example"
              onChange={this.handleChange}
              name="selectedOrdersStatus"
              as="select"
            >
              <option value={""}>כל ההזמנות </option>

              <option value={"submitted"}>הזמנות מחכות לאישור</option>
              <option value={"seller_approved"}>הזמנות לפני משלוח</option>
              <option value={"filled"}>הזמנות שנשלחו</option>
              <option value={"unpaid"}> לא שולמו</option>
              <option value={"payment_received"}> שולמו</option>
            </Form.Control>
            <br></br>
            <Form.Group className="no-print">
              <Form.Label></Form.Label>

              <Form.Check
                onChange={this.handleChange}
                inline
                type="radio"
                label="שולם"
                name="paymentStatus"
                id="formHorizontalRadios1"
                value={"payment_received"}
              />
              <Form.Check
                inline
                onChange={this.handleChange}
                inline
                type="radio"
                label="לא שולם"
                name="paymentStatus"
                value={"unpaid"}
                id="formHorizontalRadios2"
              />
              <Form.Check
                inline
                onChange={this.handleChange}
                inline
                type="radio"
                label=" הכל"
                name="paymentStatus"
                value={""}
                id="formHorizontalRadios2"
              />
            </Form.Group>
            <Form.Group className="no-print">
              <Form.Label></Form.Label>

              <Form.Check
                onChange={this.handleChange}
                inline
                type="radio"
                label="הכל"
                name="madeBy"
                id="formHorizontalRadios1"
                value={""}
              />
              <Form.Check
                inline
                onChange={this.handleChange}
                inline
                type="radio"
                label='נעשו ע"י קונה'
                name="madeBy"
                value={"buyer"}
                id="formHorizontalRadios2"
              />
              <Form.Check
                inline
                onChange={this.handleChange}
                inline
                type="radio"
                label='נעשו ע"י מוכר'
                name="madeBy"
                value={"seller"}
                id="formHorizontalRadios2"
              />
            </Form.Group>
          </Form.Group>
        </div>
        <br></br>
        {this.props.activeAccount &&
        this.props.activeAccount.account_type == 3 &&
        this.state.selectedAccountID !== "" &&
        this.state.selectedAccount ? (
          <div className="ordersInfoPageUserInfo">
            {/* <span> {JSON.stringify(new Date()).substring(1, 11)}</span> */}
            <div>{`${this.state.fromTodate}`}</div>
            {this.state.selectedAccount &&
            this.state.paymentStatus === "unpaid" ? (
              <span style={{ margin: "auto" }}>דוח חייבים </span>
            ) : null}{" "}
            {this.state.selectedAccount && this.state.paymentStatus === "" ? (
              <span style={{ margin: "auto" }}> פירוט חיובים </span>
            ) : null}
            <span>{` מספר חשבון : ${this.state.selectedAccountID} `}</span>
            <span>{`    שם : ${this.state.selectedAccount.name} `}</span>
            <br></br>
            <span>חפ : {this.state.selectedAccount.tax_id}</span>
            <span>כתובת : {this.state.selectedAccount.store_address}</span>
          </div>
        ) : null}
        <div className="allOrdersTableDiv">
          {" "}
          <Table hover className="transactionsList">
            <thead>
              <tr>
                <th>מספר הזמנה</th>
                <th>תאריך</th>
                <th> סטאטוס משלוח</th>
                <th>סטאטוס תשלום</th>
                <th>נוצרה ע"י</th>

                <th>
                  {" "}
                  {this.props.activeAccount &&
                  this.props.activeAccount.account_type == 3
                    ? "שם קונה"
                    : "שם מוכר"}
                </th>
                <th> סכום לפני מע"מ</th>

                <th> סכום לאחר מע"מ</th>
              </tr>
            </thead>
            <tbody>
              {orders}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{totalSumBefore}</td> <td>{totalSumAfter}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            style={{ display: this.props.screenWidth > 650 ? "" : "none" }}
            className="printButton no-print "
            onClick={window.print}
            type="button"
          >
            הדפס
          </Button>
        </div>
      </div>
    );
  }
}

export default AllOrders;
