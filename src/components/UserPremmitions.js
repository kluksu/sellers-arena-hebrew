import React, { Component } from "react";
import { Button, Form, Container, Col, Row, Tabs } from "react-bootstrap";
import FullPageLoader from "./FullPageLoader";
import { getData } from "./utils";

export default class UserPremmitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: "",
      currentUserPermission: "",
      userPremissions: "",
    };
  }

  componentDidMount() {
    this.props.getMyUsers();
  }
  changePermissions = () => {};

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const usersOptionsArr = [];
    if (this.props.myUsers) {
      this.props.myUsers.forEach((user) => {
        usersOptionsArr.push(
          <option value={user.id}>{`${user.id}   ${user.email}`}</option>
        );
      });
    }

    return (
      <div className="registerPage">
        <Container className="registerContainer">
          <Form>
            <Row>
              <Col xl={12}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>choose user </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="-----"
                    type="text"
                    as="select"
                    name="selectedUser"
                  >
                    <option>------------</option>
                    {usersOptionsArr}
                  </Form.Control>
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
                    name="userPremissions"
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
                  onClick={this.changePermissions}
                  className="w-100"
                  type="button"
                  variant="warning"
                >
                  change user permmitions
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
