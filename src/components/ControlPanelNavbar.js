import React, { Component } from "react";
import { Tab, Tabs, Nav, FormControl, Row } from "react-bootstrap";

export default class ControlPanelNavbar extends Component {
  render() {
    const showFieldLinksArr = [];
    for (const [key, value] of Object.entries(this.props.fieldsArr)) {
      showFieldLinksArr.push(
        <Nav.Link
          href={`${this.props.link}/${key}-${value}`}
        >{`${key} ${value}`}</Nav.Link>
      );
    }

    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="add-user" title=" הוסף משתמש קיים"></Tab>
        <Tab eventKey="create-user" title=" צור משתמש"></Tab>
        <Tab eventKey="delete-user" title="הסר משתמש"></Tab>
        <Tab eventKey="edit-user" title="ערוך הרשאות משתמש"></Tab>
      </Tabs>
    );
  }
}
