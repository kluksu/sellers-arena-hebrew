import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default class QuantityDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      key: "",
      isDisabled: false,
      variant: "primary",
      json: "",
      buttonText: "add discount",
      warning: "",
    };
  }

  lockAndSend = () => {
    this.setState({ warning: "" });

    if (this.state.value && this.state.key) {
      this.setState({ variant: "danger" });
      this.setState({ isDisabled: true });
      this.setState({ buttonText: "undo" });
      this.props.addDiscount(this.state.key, this.state.value);
      this.props.updateDiscounts(this.state.key, this.state.value);
    } else {
      this.setState({ warning: "fields may not be bank" });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.state.key);
    console.log(this.state.value);
    let optionsArr = [];
    for (let i = 0; i < 100; i++) {
      optionsArr.push(<option value={i / 100}>{i}% </option>);
    }

    return (
      <div>
        <>
          <Row>
            <Col xl={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>quntity for discount</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="number"
                  disabled={this.state.isDisabled}
                  placeholder="quntity for discount"
                  name="key"
                />
              </Form.Group>
              <p className="FormRejects">{this.state.warning}</p>
            </Col>
            <Col xl={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label> discount rate</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  disabled={this.state.isDisabled}
                  as="select"
                  type="number"
                  placeholder="variation value"
                  name="value"
                >
                  {optionsArr}
                </Form.Control>
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
