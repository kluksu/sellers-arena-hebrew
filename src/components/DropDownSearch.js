import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class DropDownSearch extends Component {
  render() {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label>search...</Form.Label> */}
        <Form.Control
          onChange={this.props.handleChange}
          name={this.props.state}
          type="text"
          placeholder="חפש שם\מספר פריט"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
    );
  }
}
