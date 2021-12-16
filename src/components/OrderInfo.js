import React, { Component } from "react";
import { Table, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PriceSelector from "./PriceSelector";
import QuantitySelector from "./QuantitySelector";
import { domain, getData } from "./utils";

class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // notice: "",
      activeCart: "",
    };
  }

  // getNotice = (notice) => {
  //   this.setState({ notice: notice });
  // };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeCart !== prevProps.activeCart) {
    }
  }
  componentDidMount() {
    if (
      this.props.activeAccount &&
      this.props.activeAccount.account_type == 2
    ) {
      getData(
        `${domain}/cart/${this.props.activeCart.id}/`,
        "",
        ` ${this.props.accessToken}`
      ).then((data) => {
        this.setState({ activeCart: data });
      });
    } else if (
      this.props.activeAccount &&
      this.props.activeAccount.account_type == 3
    ) {
      this.setState({ activeCart: this.props.activeCart });
    }
  }

  render() {
    // let tableDirection = this.props.screenWidth > 774 ? "" : "horizontal";
    let variationArr = [];

    if (
      this.props.accessToken &&
      this.props.activeCart &&
      this.props.activeCart.all_item_variations
    ) {
      this.props.activeCart.all_item_variations.forEach((variation) => {
        let miniVarArr = [];

        //fix bug here : all variations are shown right now, not just the right one
        for (const [key, value] of Object.entries(
          variation.item_variation.variation
        )) {
          miniVarArr.push(
            <div style={{ whiteSpace: "nowrap" }}>{` ${key} : ${value}, `}</div>
          );
        }
        let priceSelector =
          this.props.isChangable === true ? (
            <PriceSelector
              activateStageChangesButton={this.props.activateStageChangesButton}
              isPriceFiledDisabled={this.props.isPriceFiledDisabled}
              activeAccount={this.props.activeAccount}
              changedQuantities={this.props.changedQuantities}
              price={variation.item_variation.cost_per_item}
              variation={variation.item_variation}
              quantity={variation.quantity}
              createDelta={this.props.createDelta}
            ></PriceSelector>
          ) : (
            variation.item_variation.cost_per_item
          );

        let quantity =
          this.props.isChangable === true ? (
            <QuantitySelector
              activateStageChangesButton={this.props.activateStageChangesButton}
              orderID={this.props.orderID}
              changedQuantities={this.props.changedQuantities}
              activeAccount={this.props.activeAccount}
              isChangable={this.props.isChangable}
              createDelta={this.props.createDelta}
              // getNotice={this.getNotice}
              getCartProducts={this.props.getCartProducts}
              value={variation.quantity}
              variation={variation.item_variation}
              price={variation.item_variation.cost_per_item}
            ></QuantitySelector>
          ) : (
            variation.quantity
          );
        variationArr.push(
          <tr>
            <td>{variation.item_variation.id}</td>

            <td>{variation.item_variation.item.name}</td>
            <td style={{ whiteSpace: "normal" }}>{miniVarArr}</td>

            <td>
              {" "}
              {quantity}
              {/* <p className="FormRejects">{this.state.notice}</p> */}
            </td>
            <td>{priceSelector}</td>
            <td>{variation.total_price_of_item_variation_before_discount}</td>
            <td>
              {(1 -
                variation.total_price_of_item_variation_after_discount /
                  variation.total_price_of_item_variation_before_discount) *
                100}
              %
            </td>
            <td>{variation.total_price_of_item_variation_after_discount}</td>
          </tr>
        );
      });
    }
    if (this.state.activeCart) {
      return (
        <Table
          // tableDirection
          responsive
          striped
          bordered
          hover
          variant="light"
          size="sm"
          // className="orderInfoWindow"
        >
          <thead>
            <td>קוד מוצר</td>
            <td>שם</td>
            <td>תיאור</td>
            <td>כמות</td>
            <td style={{ minWidth: "121px" }}>מחיר ליחידה</td>
            <td>מחיר לפני הנחה</td>
            <td>הנחה</td>
            <td>מחיר לאחר הנחה</td>
          </thead>
          <tbody>
            {variationArr}

            <tr>
              <td>מספר הזמנה </td>
              <td>מספר לקוח</td>

              <td>מספר מוכר</td>
              <td>כמות כוללת</td>

              <td>לפני מיסים</td>
              <td>אחוז המס</td>
              <td>סה"כ</td>
            </tr>
            <tr>
              <td>{this.props.activeCart.id}</td>
              <td> {this.props.activeCart.buyer_account}</td>

              <td> {this.props.activeCart.seller_account}</td>
              <td> {this.props.activeCart.total_quantity}</td>

              <td> {this.props.activeCart.total_price_before_tax}</td>
              <td> {this.props.activeCart.estimated_tax}</td>
              <td> {this.props.activeCart.total_price_after_tax}</td>
            </tr>
          </tbody>
        </Table>
      );
    } else return <div></div>;
  }
}
export default withRouter(OrderInfo);
