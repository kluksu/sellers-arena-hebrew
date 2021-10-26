import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default class RootPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountToActivate: "",
      activateOrDeActivate: "",
    };
  }
  componentDidUpdate() {
    console.log(this.state.activateOrDeActivate, this.state.accountToActivate);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="registerPage">
        <Container>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> activate account</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="accountToActivate"
            />
            <Form.Text></Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>action type</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              as="select"
              name="activateOrDeActivate"
              // value={true}
            >
              {" "}
              <option value={null}>-----------------</option>
              <option value={true}>activate</option>
              <option value={false}>deactivate</option>
            </Form.Control>
          </Form.Group>
          <Button
            onClick={() =>
              this.props.activateDeActivateAccount(
                this.state.accountToActivate,
                this.state.activateOrDeActivate
              )
            }
            variant="primary"
            type="button"
          >
            activate account
          </Button>
        </Container>
        {/* <Form.Select
          aria-label="Default select example"
          name="activateOrDeActivate"
        >
          <option value="true">activate</option>
          <option value="false">deactivate</option>
        </Form.Select> */}
        {/* <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>action</Form.Label>
          <Form.Select>
            <option value="true">activate</option>
            <option value="false">deactivate</option>
          </Form.Select>
        </Form.Group> */}
      </div>
    );

    /* <Container>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> activate account</Form.Label>
                <Form.Control type="number" name="accountToActivate" />
                <Form.Text></Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                name="activateOrDeActivate"
              >
                <Form.Label>action</Form.Label>
                <Form.Select>
                  <option value="true">activate</option>
                  <option value="false">deactivate</option>
                </Form.Select>
              </Form.Group>

              <Button
                onClick={() =>
                  this.props.activateDeActivateAccount(
                    this.state.accountToActivate,
                    this.state.activateOrDeActivate
                  )
                }
                variant="primary"
                type="button"
              >
                activate account
              </Button>
            </Form>{" "}
          </Container> */
  }
}
