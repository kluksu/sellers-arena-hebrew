import React, { Component } from "react";
import { Table, NavLink, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class EditVariationsCard extends React.Component {
  render() {
    let variationsARR = [];
    let discountsARR = [];

    for (let [key, value] of Object.entries(this.props.variations)) {
      variationsARR.push(
        <tr>
          {" "}
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    }
    for (let [key, value] of Object.entries(this.props.discounts)) {
      discountsARR.push(
        <tr>
          {" "}
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    }
    return (
      <NavLink href={this.props.link}>
        <div className="EditVariationsCard">
          <div>
            {" "}
            <img src={this.props.pictures} alt="variation picture"></img>{" "}
            <div>קוד וריאציה:{this.props.id}</div>
          </div>

          <div>
            <Row>
              <Col xl={12}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td>שם תכונה</td>
                    <td>ערך תכונה</td>
                  </thead>
                  <tbody>{variationsARR}</tbody>
                </Table>
              </Col>
              <Col xl={12}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <td>הנחת כמות</td>
                    <td>גובה ההנחה</td>
                  </thead>{" "}
                  <tbody>{discountsARR}</tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </NavLink>
    );
  }
}
export default withRouter(EditVariationsCard);
