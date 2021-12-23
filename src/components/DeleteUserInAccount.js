import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Container, Col, Row, Tabs } from "react-bootstrap";
import { getData, handleKeyDown, postData } from "./utils";

export default class DeleteUserInAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: "",
    };
  }
  componentDidMount() {
    // this.props.getMyUsers();
  }

  deleteUser = () => {
    //to be writen
    // postData(`${domain}/my-users/`,"",` ${this.props.accessToken}`)
    // .then(data => {
    //
    //     this.setState({users:data.results})
    //   })
  };
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
          <Form onKeyDown={(event) => handleKeyDown(event, this.deleteUser)}>
            <Row>
              <Col xl={12}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>בחר את המשתמש שברצונך להסיר </Form.Label>
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

            <br></br>
            <Row>
              <Col xl={12}>
                <Button
                  onClick={this.deleteUser}
                  className="w-100"
                  type="button"
                  variant="danger"
                >
                  הסר
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
