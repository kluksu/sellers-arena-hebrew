import axios from "axios";
import React, { Component } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import MyDateRange from "../components/MyDateRange";
import { domain } from "../components/utils";

class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrdersStatus: "",
      MySupplierOrders: [],
      sellerApprovedOrders: [],
      fulfilledOrders: [],
      payedOrders: [],
      selectedUser: "",
      activeOrders: [],
      startDate: new Date(),
      endDate: new Date(),
    };
  }
  handleSelect = (ranges) => {
    console.log(ranges.selection.startDate, ranges.selection.endDate);
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
    endDate = `${JSON.stringify(endDate).substring(1, 11)}T00%3a00%3a00`;
    startDate = `${JSON.stringify(startDate).substring(1, 11)}T00%3a00%3a00`;
    console.log(startDate);
    axios
      .get(
        `${domain}/${path}/?&submitted_at__gte=${startDate}&submitted_at__lte=${endDate}&order_status=${status}`,
        config
      )
      .then((data) => {
        if (data.status == 200) {
          console.log(data);
          this.setState({ activeOrders: data.data.results });
          // console.log(data.data.results);
          // this.setState({ [state]: data.data.results });
        }
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.endDate !== prevState.endDate ||
      this.state.startDate !== prevState.startDate ||
      this.state.selectedOrdersStatus !== prevState.selectedOrdersStatus
    ) {
      console.log(this.state.startDate);
      this.getFilteredOrders(
        this.state.selectedOrdersStatus,
        this.state.startDate,
        this.state.endDate,
        ""
      );
    }
    // if (this.state.selectedOrdersStatus !== prevState.selectedOrdersStatus) {
    //   console.log(this.state.selectedOrdersStatus);
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
    let orders = this.state.activeOrders.map((order) => {
      console.log(order);

      return (
        <tr
          onClick={() => {
            window.location.assign(
              this.props.activeAccount.account_type == 3
                ? `/#/supplier-order/${order.id}`
                : `/#/my-order/${order.id}`
            );
          }}
        >
          <td>{order.id}</td>
          <td>
            {" "}
            {`${order.submitted_at.replace("T", " ").slice(0, 19)}    `} {}
          </td>
          <td>{order.order_status}</td>
          <td>{order.user}</td>
          <td>
            {this.props.activeAccount &&
            this.props.activeAccount.account_type == 3
              ? order.buyer_account.name
              : order.seller_account.name}
          </td>
        </tr>
      );
    });
    return (
      <div className="allOrdersPage">
        <Row>
          {/* payedOrders={this.state.payedOrders}
              fulfilledOrders={this.state.fulfilledOrders}
              sellerApprovedOrders={this.state.sellerApprovedOrders}
              MySupplierOrders={this.state.MySupplierOrders} */}
          <Col>
            {" "}
            <MyDateRange
              handleSelect={this.handleSelect}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            ></MyDateRange>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
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
                <option value={"payed"}>הזמנות ששולמו</option>
              </Form.Control>
            </Form.Group>
            <Table hover className="transactionsList">
              <thead>
                <tr>
                  <th>מספר הזמנה</th>
                  <th>תאריך</th>
                  <th>סטאטוס</th>
                  <th>נוצרה ע"י</th>
                  <th>
                    {" "}
                    {this.props.activeAccount &&
                    this.props.activeAccount.account_type == 3
                      ? "שם קונה"
                      : "שם מוכר"}
                  </th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </Table>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                aria-label="Default select example"
                onChange={this.handleChange}
                name="selectedUser"
                as="select"
              >
                <option value={""}>
                  כל{" "}
                  {this.props.activeAccount &&
                  this.props.activeAccount.account_type == 3
                    ? "החנויות"
                    : "הספקים"}{" "}
                </option>
                options arr
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AllOrders;
