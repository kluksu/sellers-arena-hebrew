import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default class AddVars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      key: "",
      isDisabled: false,
      variant: "primary",
      json: "",
      buttonText: "add item",
      warning: "",
    };
  }

  lockAndSend = () => {
    this.setState({ warning: "" });

    if (this.state.key !== "" && this.state.value !== "") {
      this.setState({ variant: "danger" });
      this.setState({ isDisabled: true });
      this.setState({ buttonText: "undo" });
      this.props.addVar(this.state.key, this.state.value);
      this.props.updateObj(this.state.key, this.state.value);
    } else {
      this.setState({ warning: "fields may not be blank" });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <>
          <Row>
            <Col xl={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>variation name</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  disabled={this.state.isDisabled}
                  placeholder="variation"
                  name="key"
                />
              </Form.Group>
              <p className="FormRejects">{this.state.warning}</p>
            </Col>
            <Col xl={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label> variation value</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  disabled={this.state.isDisabled}
                  type="text"
                  placeholder="variation value"
                  name="value"
                />
              </Form.Group>
            </Col>

            <Col xl={2}>
              <Button
                onClick={this.lockAndSend}
                type="button"
                disabled={this.state.isDisabled}
                variant={this.state.variant}
              >
                {this.state.buttonText}
              </Button>
            </Col>
          </Row>
        </>
      </div>
    );
  }
}
