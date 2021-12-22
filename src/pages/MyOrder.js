import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import OrderInfo from "../components/OrderInfo";
import { domain } from "../components/utils";

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      activeCartSellerEdited: {},
      activeCartSnapshot: {},
      sellerName: "",
    };
  }
  // getorder=(orderID)=>{
  //     const authorization = !this.props.accessToken
  //     ? null
  //     : `Bearer ${this.props.accessToken}`;
  //   const config = {
  //     headers: { "Content-Type": "application/json", authorization },
  //   };
  // return axios.get(`${domain}/my-orders/${orderID}/`,config)
  // }
  onMountOrUpdate = () => {
    this.props.getSpecificOrder(this.props.match.params.id).then((res) => {
      this.setState({ orderInfo: res.data });
      console.log(res.data);
      // let activeCart =
      //   res.data.seller_edited_snapshot !== null
      //     ? res.data.seller_edited_snapshot
      //     : res.data.cart_snapshot;
      this.setState({
        activeCartSellerEdited: res.data.seller_edited_snapshot,
      });
      console.log(res.data.seller_edited_snapshot);
      this.setState({ activeCartSnapshot: res.data.cart_snapshot });
    });
  };
  componentDidMount() {
    this.onMountOrUpdate();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.onMountOrUpdate();
    }
    if (this.props.accessToken !== prevProps.accessToken) {
      console.log(this.props.accessToken);
      this.onMountOrUpdate();
    }
    if (this.state.orderInfo !== prevState.orderInfo) {
      this.setState({ sellerName: this.state.orderInfo.seller_account.name });
    }
  }
  getCartProducts = (item_variation_id, quantity) => {
    let cart = this.state.cartItems;
    cart[item_variation_id] = parseInt(quantity);
    this.setState({ cartItems: cart });
  };
  render() {
    return (
      <div className="myOrderPage">
        <div className="orderSummeryContainer">
          {this.state.activeCartSellerEdited !== null ? (
            <>
              <h1>הזמנה ערוכה</h1>
              <p>
                ההזמנה שמופיעה בטבלה היא לאחר עריכה של המוכר, יש להשוות להזמנה
                מתחת על מנת לזהות חריגות מההזמנה המקורית
              </p>
              <h6>{this.state.sellerName}</h6>
              <OrderInfo
                cartsDelta={this.state.cartsDelta}
                isPriceFiledDisabled={"disabled"}
                getCartProducts={this.getCartProducts}
                accessToken={this.props.accessToken}
                orderID={this.props.match.params.id}
                isChangable={false}
                activeCart={this.state.activeCartSellerEdited}
                activeCart2={this.state.activeCartSnapshot}
                activeAccount={this.props.activeAccount}
              ></OrderInfo>
            </>
          ) : null}
          <h1>הזמנה מקורית</h1>
          <p>ההזמנה שמופיע בטבלה למטה הינה ההזמנה המקורית ששלחת</p>
          <OrderInfo
            defultColor={true}
            isPriceFiledDisabled={"disabled"}
            getCartProducts={this.getCartProducts}
            accessToken={this.props.accessToken}
            orderID={this.props.match.params.id}
            isChangable={false}
            activeCart2={this.state.activeCartSellerEdited}
            activeCart={this.state.activeCartSnapshot}
            activeAccount={this.props.activeAccount}
          ></OrderInfo>
          {/* <div className="sellerInfoContainer">
            <span> {this.state.activeCart.buyer_account.name}</span>
            <div>
              {" "}
              <span>
                {this.state.activeCart.buyer_account.store_address}{" "}
                {this.state.activeCart.buyer_account.phone_number}{" "}
              </span>
            </div>

            <div> {`ח"פ:${this.state.activeCart.buyer_account.tax_id}  `}</div>
          </div> */}
        </div>
      </div>
    );
  }
}
export default withRouter(MyOrder);
