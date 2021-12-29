import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default class MyUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserID: "",
      selectedUserInfo: {},
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    // this.props.getMyUsers();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      //   this.props.getMyUsers();
    }
    if (this.state.selectedUserID !== prevState.selectedUserID) {
      this.props.myUsers.forEach((user) => {
        if (user.id == this.state.selectedUserID) {
          this.setState({ selectedUserInfo: user });
        }
      });
    }
  }
  render() {
    let userInfo = [];

    for (const [key, value] of Object.entries(this.state.selectedUserInfo)) {
      if (typeof value === "object") {
        for (const [innerKey, innerValue] of Object.entries(value[0])) {
          userInfo.push(<div>{`${innerKey} : ${innerValue}`}</div>);
        }
      } else {
        userInfo.push(<div>{`${key} : ${value}`}</div>);
      }
    }
    let usersArr = [];
    if (this.props.myUsers)
      this.props.myUsers.forEach((user) => {
        usersArr.push(<option value={user.id}>{user.email}</option>);
      });
    return (
      <div className="registerPage">
        <Container
          onKeyDown={(event) => event.preventDefault()}
          className="registerContainer"
        >
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>בחר משתמש </Form.Label>
            <Form.Control
              onChange={this.handleChange}
              placeholder="-----"
              type="text"
              as="select"
              name="selectedUserID"
            >
              <option value="">------------</option>
              {usersArr}
            </Form.Control>
          </Form.Group>
          {userInfo}
        </Container>
      </div>
    );
  }
}
