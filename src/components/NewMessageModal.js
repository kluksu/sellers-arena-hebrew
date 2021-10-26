import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { domain } from "./utils";

export default class NewMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      modalMessages: [],
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getAllUserMessages = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    axios
      .get(`${domain}/messages/?message_thread=${this.props.threadID}`, config)
      .then((res) => {
        this.setState({ modalMessages: res.data.results });
        console.log(res);
      });
  };
  componentDidMount() {
    this.getAllUserMessages();
  }
  // for tomorrow - when message modal is closed, delete last taxt
  render() {
    let showMessages = [];
    if (this.props.threadTextRespons && this.props.activeAccount) {
      this.props.threadTextRespons.data.results.forEach((message) => {
        if (!message.text.includes("wasReadBy")) {
          let src_account =
            message.src_account === this.props.activeAccount.id
              ? this.props.activeAccount.name
              : this.props.currentStore.name;
          let israelTime = message.created_at.replace("T", " ");
          israelTime = israelTime.slice(0, 19);

          showMessages.push(
            <div className="messageContainer">
              <div>
                {israelTime} by {message.src_user}
              </div>
              <span>{src_account}: </span>
              <span>{message.text}</span>{" "}
            </div>
          );
        }
      });
    }
    return (
      <>
        <Modal show={this.props.isOpen} onHide={() => this.props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>
              send message to {this.props.currentStore.name}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalMessageThreadContainer">
              {showMessages.reverse()}
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>message</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                onChange={this.props.getMessageText}
                placeholder="Enter message here"
                name="message"
              />
              <Form.Text className="text-muted">
                all masseges are saved
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.handleClose()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.sendMessage(this.props.currentStore.id)}
            >
              submit message
            </Button>
            <Button
              variant="success"
              onClick={() =>
                this.props.postAndGetContacts(this.props.currentStore.id)
              }
            >
              add to contacts
            </Button>{" "}
            <Button
              variant="danger"
              onClick={() =>
                this.props.removeContact(this.props.currentStore.id)
              }
            >
              remove from contacts
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
