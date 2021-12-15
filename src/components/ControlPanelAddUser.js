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
        this.props.openGenericModal("הצלחה!", "המשתמש נוסף בהצלחה לחשבון");
      })
      .catch(
        this.props.openGenericModal(
          "אופס!",
          "אנא וודא שכל המידה שהזנת נכון ומלא ולאחר מכן נסה שנית"
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
                  <Form.Label> קוד משתמש </Form.Label>
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
                  <Form.Label>הרשאות משתמש </Form.Label>
                  <Form.Control
                    onChange={this.handleChange}
                    placeholder="-----"
                    type="text"
                    as="select"
                    name="userPromitions"
                  >
                    <option>------------</option>
                    <option value={"read"}>קריאה בלבד</option>
                    <option value={"write"}>קריאה ועריכה</option>
                    <option value={"admin"}>
                      מנהל(קריאה, עריכה וניהול משתמשים)
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
                  הוסף משתמש לחשבון
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
