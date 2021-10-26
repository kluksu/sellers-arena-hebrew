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
      buttonText: "הוסף מוצר",
      warning: "",
    };
  }

  lockAndSend = () => {
    this.setState({ warning: "" });

    if (this.state.key !== "" && this.state.value !== "") {
      this.setState({ variant: "danger" });
      this.setState({ isDisabled: true });
      this.setState({ buttonText: "בטל" });
      this.props.addVar(this.state.key, this.state.value);
      this.props.updateObj(this.state.key, this.state.value);
    } else {
      this.setState({ warning: "שדה חובה" });
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
                <Form.Label>שם תכונה</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="text"
                  disabled={this.state.isDisabled}
                  placeholder="לדוגמה - צבע"
                  name="key"
                />
              </Form.Group>
              <p className="FormRejects">{this.state.warning}</p>
            </Col>
            <Col xl={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label> ערך תכונה</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  disabled={this.state.isDisabled}
                  type="text"
                  placeholder="לדוגמה - כחול"
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
