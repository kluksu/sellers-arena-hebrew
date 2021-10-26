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

      if (this.props.variation && this.props.variation.variation !== {}) {
        for (const [key, value] of Object.entries(variation.variation)) {
          info.push(
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }
        if (this.props.variation && this.props.variation.discounts !== {}) {
        }
        for (const [key, value] of Object.entries(variation.discounts)) {
          varArr.push(
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        }
      }

      return (
        <Table striped bordered hover size="sm" variant="dark hidden ">
          <tbody>
            <tr>
              <td>name</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td>currency</td>
              <td>{item.currency}</td>
            </tr>
            <tr>
              <td>batch size</td>
              <td>{batch_size}</td>
            </tr>
            <tr>
              <td>price</td>
              <td>{cost_per_item}</td>
            </tr>
            {varArr}
            {info}
          </tbody>
        </Table>
      );
    } else return null;
  }
}
