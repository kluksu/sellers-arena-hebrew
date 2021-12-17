import React, { Component } from "react";
import { Col, Form, Row } from "react-bootstrap";
import MyDateRange from "../components/MyDateRange";

class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrdersStatus: "all",
      MySupplierOrders: [],
      sellerApprovedOrders: [],
      fulfilledOrders: [],
      payedOrders: [],
      selectedUser: "",
      activeOrders: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedOrdersStatus !== prevState.selectedOrdersStatus) {
      console.log(this.state.selectedOrdersStatus);
      this.chooseOrdersStatus();
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  chooseOrdersStatus = () => {
    if (this.state.selectedOrdersStatus === "all") {
      this.setState({
        activeOrders: this.props.MySupplierOrders.concat(
          this.props.fulfilledOrders.concat(this.props.sellerApprovedOrders)
        ),
      });
    } else {
      this.setState({
        activeOrders: this.props[this.state.selectedOrdersStatus],
      });
    }
  };
  onMount = () => {};
  render() {
    let orders = this.state.activeOrders.map((order) => {
      return (
        <div
          onClick={() => {
            window.location.assign(
              this.props.activeAccount.account_type == 3
                ? `/#/supplier-order/${order.id}`
                : `/#/my-order/${order.id}`
            );
          }}
        >
          {order.id}
        </div>
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
            <MyDateRange></MyDateRange>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control
                aria-label="Default select example"
                onChange={this.handleChange}
                name="selectedOrdersStatus"
                as="select"
              >
                <option value={"all"}>כל ההזמנות </option>

                <option value={"MySupplierOrders"}>הזמנות מחכות לאישור</option>
                <option value={"sellerApprovedOrders"}>
                  הזמנות לפני משלוח
                </option>
                <option value={"fulfilledOrders"}>הזמנות שנשלחו</option>
                <option value={"payedOrders"}>הזמנות ששולמו</option>
              </Form.Control>
            </Form.Group>
            {orders}
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
