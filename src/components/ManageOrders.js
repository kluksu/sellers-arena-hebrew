import React, { Component } from "react";
import { Button, Form, Tab, Col, Row, Tabs } from "react-bootstrap";

import UserPremmitions from "../components/UserPremmitions";

export default class ManageOrders extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="" title="הזמנות פתוחות"></Tab>
        <Tab eventKey="" title="הזמנות סגורות"></Tab>
        <Tab eventKey="" title="הזמנות דחויות"></Tab>
        <Tab eventKey="" title="צור הזמנה חדשה"></Tab>
      </Tabs>
    );
  }
}
