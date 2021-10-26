import React, { Component } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import { domain, postData } from "./utils";

export default class ControlPanelAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPromitions: "",
      userID: "",
    };
  }
  addUser = () => {
    postData(
      `${domain}/my-accounts/${this.props.activeAccount.id}/add_user/`,
      { user_id: this.state.userID, user_type: this.state.userPromitions },
      ` ${this.props.accessToken}`
    )
      .then((data) => {
        this.props.openGenericModal(
          "success!",
          "user was successfully added tou your account"
        );
        console.log(data);
      })
      .catch(
        this.props.openGenericModal(
          "ERROR!",
          "please verify that all of the information is correct and try again"
        )
      );
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="registerPage">
        <Container className="registerContainer">
          <Form>
            <Row>
              <Col xl={12}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label> user id </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="user id here..."
                    type="text"
                    name="userID"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>user promitions </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="-----"
                    type="text"
                    as="select"
                    name="userPromitions"
                  >
                    <option>------------</option>
                    <option value={"read"}>read only</option>
                    <option value={"write"}>read and write</option>
                    <option value={"admin"}>
                      admin (read,write,control users)
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col xl={12}>
                <Button
                  onClick={this.addUser}
                  className="w-100"
                  type="button"
                  variant="primary"
                >
                  add user to my acount
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
