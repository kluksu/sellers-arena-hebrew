import React, { Component } from "react";
import { Button, Form, Tab, Col, Row, Tabs } from "react-bootstrap";

import UserPremmitions from "../components/UserPremmitions";

export default class ManageOrders extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="" title="open orders"></Tab>
        <Tab eventKey="" title="closed ordera"></Tab>
        <Tab eventKey="" title="rejected orders"></Tab>
        <Tab eventKey="" title="create new order"></Tab>
      </Tabs>
    );
  }
}
