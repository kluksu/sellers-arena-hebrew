import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { domain } from "./utils";

export default class AddUnregisterdAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      taxID: "",
      phoneNumber: "",
      address: "",
      email: "",
    };
  }
  componentDidMount() {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios.get(`${domain}/me/`, config);
  }
  createNewClient = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .post(
        `${domain}/unregistered-accounts/`,
        {
          name: this.state.name,
          parent_account: this.props.activeAccount.id,
          phone_number: this.state.phoneNumber,
          store_address: this.state.address,
          email: this.state.email,
          tax_id: this.state.taxID,
        },
        config
      )
      .then((res) => {
        this.props.openGenericModal("success!", "new buyer card was created");
      })
      .catch(
        this.props.openGenericModal(
          "Error!",
          "there was a problem creating new client, please verify that all the information is correct and try again"
        )
      );
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="" title="create client">
            <div className="registerPage">
              <Container className="registerContainer">
                <Form>
                  <Row>
                    <Col xl={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label> store name </Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          placeholder="name..."
                          type="text"
                          name="name"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>phone number </Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          placeholder="name..."
                          type="number"
                          name="phoneNumber"
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                  </Row>{" "}
                  <Row>
                    <Col xl={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>store address </Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          placeholder="name..."
                          type="text"
                          name="address"
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                  </Row>{" "}
                  <Row>
                    <Col xl={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>store email </Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          placeholder="name..."
                          type="email"
                          name="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>{" "}
                  </Row>
                  <Row>
                    <Col xl={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>tax id</Form.Label>
                        <Form.Control
                          onChange={this.handleChange}
                          placeholder="name..."
                          type="number"
                          name="taxID"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col xl={12}>
                      <Button
                        onClick={this.createNewClient}
                        className="w-100"
                        type="button"
                        variant="primary"
                      >
                        create new client
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </div>
          </Tab>
          {/* <Tab eventKey="" title="closed ordera"></Tab>
          <Tab eventKey="" title="rejected orders"></Tab>
          <Tab eventKey="" title="create new order"></Tab> */}
        </Tabs>
      </div>
    );
  }
}
