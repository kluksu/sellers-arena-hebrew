import React, { Component } from "react";
import { Col, NavLink, Table } from "react-bootstrap";

export default class InfoBox extends Component {
  render() {
    let info = [];
    let varArr = [];
    let item = this.props.item;
    let variation = this.props.variation;
    if (this.props.variation) {
      let batch_size =
        this.props.variation.batch_size !== undefined
          ? variation.batch_size
          : null;
      let cost_per_item =
        this.props.variation.cost_per_item !== undefined
          ? variation.cost_per_item
          : null;
      let is_in_stock = this.props.variation.is_in_stock
        ? variation.is_in_stock
        : null;
      let amount_in_stock = this.props.variation.amount_in_stock
        ? variation.amount_in_stock
        : null;
      if (this.props.variation && this.props.variation.variation !== {}) {
        for (const [key, value] of Object.entries(variation.variation)) {
          info.push(
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }
        // if (this.props.variation && this.props.variation.discounts !== {}) {
        // }
        // for (const [key, value] of Object.entries(variation.discounts)) {
        //   varArr.push(
        //     <tr>
        //       <td>{key}</td>
        //       <td>{value}</td>
        //     </tr>
        //   );
        // }
      }

      return (
        <Table
          className="infoBox"
          striped
          bordered
          hover
          size="sm"
          variant="light hidden "
        >
          <tbody>
            {amount_in_stock ? (
              <tr>
                <td>כמות במלאי </td>
                <td>{amount_in_stock}</td>
              </tr>
            ) : (
              <tr>
                <td>זמין במלאי </td>
                <td>{is_in_stock === true ? "כן" : "לא"}</td>
              </tr>
            )}

            <tr>
              <td>שם מוצר</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td>מטבע</td>
              <td>{item.currency}</td>
            </tr>
            <tr>
              <td>מנה</td>
              <td>{batch_size}</td>
            </tr>
            <tr>
              <td>מחיר ליחידה</td>
              <td>{cost_per_item}</td>
            </tr>
            <tr>
              <td>תיאור</td>
              <td>{this.props.item.description}</td>
            </tr>
            {varArr}
            {info}
            {this.props.link}
          </tbody>
        </Table>
      );
    } else return null;
  }
}
