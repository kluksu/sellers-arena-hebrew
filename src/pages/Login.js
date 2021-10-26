import React, { Component } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { getData } from "../components/utils";
import { v4 as uuidv4 } from "uuid";
import FullPageLoader from "../components/FullPageLoader";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // ${domain}

  render() {
    let accountsArr = [];

    for (let i = 0; i < this.props.userAccounts.length; i++) {
      const element = this.props.userAccounts[i];
      accountsArr.push(<option key={element.id}>{element.name}</option>);
    }

    return (
      <div className="registerPage">
        <Container className="registerContainer">
          <Form>
            <Form.Group>
              <FormLabel>בחר חשבון</FormLabel>
              <Form.Control
                onChange={this.handleChange}
                size="md"
                as="select"
                name="selectedAccount"
              >
                <option>---------------</option>
                {accountsArr}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            onClick={() => this.props.selectAccount(this.state.selectedAccount)}
          >
            שלח
          </Button>
        </Container>
      </div>
    );
  }
}
