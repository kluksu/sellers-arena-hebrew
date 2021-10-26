import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import OrderInfo from "../components/OrderInfo";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { domain, postData } from "../components/utils";
import DiscountModal from "../components/DiscountModal";

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCart: "",
      orderNotes: "",
      changedQuantities: {},
      isDiscountModalOpen: false,
    };
  }
  closeModal = () => this.setState({ isDiscountModalOpen: false });
  openModal = () => {
    this.setState({ isDiscountModalOpen: true });
  };

  createDelta = (key, quantity, price) => {
    if (this.props.activeAccount.account_type == 2) {
      let changedQuantities = this.state.changedQuantities;
      changedQuantities[key] = quantity;
      this.setState({ changedQuantities: changedQuantities });
    } else {
      let changedQuantities = this.state.changedQuantities;

      changedQuantities[key] = {
        quantity: quantity,
        cost_per_item: price,
      };
    }
  };
  editItem = (delta) => {
    let obj = { variations_json: this.state.changedQuantities };
    postData(
      `${domain}/cart/${this.props.match.params.id}/edit/`,
      obj,
      ` ${this.props.accessToken}`
    ).then((res) => {
      if (res.status.includes("successfully")) this.getActiveCart();
      this.openModal();
    });
  };
  checkOutAndGoHome = () => {
    this.props.checkOut(this.props.match.params.id).then((data) => {
      if (data.order_id && this.props.activeAccount.account_type == 2) {
        // this.props.deleteCart(this.props.match.params.id);
        window.location.assign("/#/");
      }
      console.log(data);
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getActiveCart = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };

    axios
      .get(`${domain}/cart/${this.props.match.params.id}/`, config)
      .then((data) => {
        console.log(data);
        this.setState({ activeCart: data.data });
      });
  };
  componentDidMount() {
    this.getActiveCart();
  }
  render() {
    console.log(this.state.activeCart);
    if (this.state.activeCart !== "") {
      return (
        <div className="OrderSummeryPage">
          <Container className="orderSummeryContainer">
            <OrderInfo
              isPriceFiledDisabled={"disabled"}
              createDelta={this.createDelta}
              isChangable={true}
              accessToken={this.props.accessToken}
              activeAccount={this.props.activeAccount}
              activeCart={this.state.activeCart}
            ></OrderInfo>
            <Button onClick={this.editItem}>stage changes</Button>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>הערות להזמנה</Form.Label>
                <Form.Control
                  className="w-50 m-auto"
                  onChange={this.handleChange}
                  placeholder="הוסף הערה במקרה הצורך..."
                  as="textarea"
                  value={this.state.category}
                  name="orderNotes"
                ></Form.Control>
              </Form.Group>{" "}
            </Form>
            <Button
              onClick={() => this.checkOutAndGoHome()}
              type="button"
              variant="primary"
            >
              שלח
            </Button>
          </Container>
          <DiscountModal
            text={"changes were"}
            closeModal={this.closeModal}
            isDiscountModalOpen={this.state.isDiscountModalOpen}
          ></DiscountModal>
        </div>
      );
    } else return null;
  }
}

export default withRouter(OrderSummery);
