import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Profile from "../pages/Profile";
import { domain, whiteLableStores } from "./utils";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalDeleteItem: "",
      messageBoardText: "",
      isMessageBoardOpen: false,
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteCartAndCloseModal = () => {
    this.props.deleteCart(this.state.modalDeleteItem.id);
    this.closeModal();
  };

  openModal = (cart) => {
    this.setState({ modalDeleteItem: cart });
    this.setState({ isOpen: true });
  };
  closeModal = () =>
    this.setState({ isOpen: false, isMessageBoardOpen: false });
  // payedOrders={this.state.payedOrders}
  // fulfilledOrders={this.state.fulfilledOrders}
  // sellerApprovedOrders={this.state.sellerApprovedOrders}
  render() {
    console.log(this.props.activeAccount);
    let logInOut = !this.props.activeAccount ? (
      <Nav.Link
        href={window.location.href}
        onClick={() => this.props.openModal()}
      >
        התחבר
      </Nav.Link>
    ) : (
      <Nav.Link href={window.location.href} onClick={() => this.props.logout()}>
        התנתק
      </Nav.Link>
    );
    let creatUser =
      this.props.activeAccount && this.props.activeAccount.account_type == 3 ? (
        <Nav.Link href="/#/register"> צור משתמש</Nav.Link>
      ) : (
        ""
      );
    let profile =
      this.props.activeAccount && this.props.activeAccount.account_type == 3 ? (
        <Nav.Link href="/#/profile"> פרופיל </Nav.Link>
      ) : (
        ""
      );

    return (
      <div className="myNavBar">
        <Navbar collapseOnSelect expand="lg" bg="light">
          {/* <Container> */}
          <Navbar.Brand href="#home">
            <img src="" alt="logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href={`/#/store/${whiteLableStores[this.props.href]}`}>
                החנות
              </Nav.Link>
              <Nav.Link href={`/#/feed/${whiteLableStores[this.props.href]}`}>
                עדכוני ספק
              </Nav.Link>
              <Nav.Link href="#my-orders">ההזמנות שלי</Nav.Link>
              {creatUser}
              {profile}
              <NavDropdown title="ההזמנות שלי" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#new-order">
                  הזמנות חדשות
                </NavDropdown.Item>
                <NavDropdown.Item href="#awaiting-delivery">
                  מחכות למשלוח{" "}
                </NavDropdown.Item>
                <NavDropdown.Item href="#awaiting-payment">
                  מחכות לתשלום{" "}
                </NavDropdown.Item>
                <NavDropdown.Item href="#awaiting-payment">
                  נסגרו
                </NavDropdown.Item>

                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
              <Nav.Link href="#createAccount">צור חשבון</Nav.Link>
            </Nav>
            <Nav>{logInOut}</Nav>
          </Navbar.Collapse>
          {/* </Container> */}
        </Navbar>
        <>
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                אתה עומד למחוק את העגלה{" "}
                {this.state.modalDeleteItem.seller_account}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>מה ברצונך לעשות</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteCartAndCloseModal}>
                מחק
              </Button>
              <Button variant="primary" onClick={this.closeModal}>
                חזור
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}
