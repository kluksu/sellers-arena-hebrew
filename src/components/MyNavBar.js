import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Row,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import LoginModal from "./LoginModal";
import { FiShoppingCart } from "react-icons/fi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { domain, logo } from "./utils";

class MyNavBar extends React.Component {
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
  updateMessageBoard = () => {
    const authorization = !this.props.accessToken
      ? null
      : `Bearer ${this.props.accessToken}`;
    const config = {
      headers: { "Content-Type": "application/json", authorization },
    };
    return axios
      .patch(
        `${domain}/my-accounts/${this.props.activeAccount.id}/`,
        { messages: this.state.messageBoardText },
        config
      )
      .then((res) => {
        this.closeModal();
      });
  };
  openMessagesBoardModal = () => {
    this.setState({ isMessageBoardOpen: true });
  };
  getAccount = (id) => {
    return axios.get(`${domain}/public-accounts/${id}/`);
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
    let rootButton =
      this.props.activeAccount && this.props.activeAccount.id == 1 ? (
        <Nav.Link href="/#/rootPage">root</Nav.Link>
      ) : null;
    let newOrderAwating =
      this.props.MySupplierOrders.length > 0
        ? `(${this.props.MySupplierOrders.length} new)`
        : "";
    let awaitingPayment = [];
    this.props.fulfilledOrders.forEach((fulfilledorder) => {
      awaitingPayment.push(
        <NavDropdown.Item href={`/#/supplier-order/${fulfilledorder.id}`}>
          {fulfilledorder.cart_snapshot.buyer_account}
        </NavDropdown.Item>
      );
    });
    let awaitingPaymentDropDown = (
      <NavDropdown title={`awating payment (${awaitingPayment.length})`}>
        {awaitingPayment}
      </NavDropdown>
    );
    let messageBoard =
      this.props.activeAccount && this.props.activeAccount.account_type == 3 ? (
        <NavLink
          href={`${window.location}`}
          onClick={this.openMessagesBoardModal}
        >
          messages board
        </NavLink>
      ) : null;
    console.log(this.props.MyShoppingCarts);
    let cartDropDown = [];
    let ordersArr = [];
    let waitingDeliveryArr = [];
    this.props.sellerApprovedOrders.forEach((approvedOrder) => {
      waitingDeliveryArr.push(
        <NavDropdown.Item href={`/#/supplier-order/${approvedOrder.id}`}>
          {approvedOrder.cart_snapshot.buyer_account}
        </NavDropdown.Item>
      );
    });
    let waitingDelivery = "";
    if (this.props.activeAccount) {
      waitingDelivery =
        this.props.activeAccount.account_type == 3 ? (
          <NavDropdown
            title={`awating delivery (${this.props.sellerApprovedOrders.length})`}
          >
            {waitingDeliveryArr}
          </NavDropdown>
        ) : null;
    }
    const controlPanel = this.props.activeAccount ? (
      <Nav.Link href="/#/control_panel">
        <CgMenuGridR />
      </Nav.Link>
    ) : null;
    // const massages = this.props.accessToken ? (
    //   <NavDropdown title={<AiOutlineMail />}>
    //     {" "}
    //     <NavDropdown.Item href="/#/todays-messages/">
    //       {" "}
    //       today`s massages
    //     </NavDropdown.Item>
    //     <NavDropdown.Item href="/#/today-messages/">
    //       {" "}
    //       all massages
    //     </NavDropdown.Item>
    //   </NavDropdown>
    // ) : null;

    const user_account =
      this.props.accessToken && this.props.userAccounts == 0 ? (
        <>
          <Nav.Link href="/#/openAccount">create account</Nav.Link>{" "}
        </>
      ) : null;
    const register = !this.props.accessToken ? (
      <Nav.Link href="/#/register">register</Nav.Link>
    ) : null;

    const login_logout = !this.props.accessToken ? (
      <Nav.Link
        href={`${window.location}`}
        onClick={() => this.props.openModal()}
      >
        login
      </Nav.Link>
    ) : (
      <Nav.Link href={`${window.location}`} onClick={() => this.props.logout()}>
        logout
      </Nav.Link>
    );
    let productUpload = "";
    if (this.props.activeAccount) {
      productUpload =
        this.props.activeAccount.account_type == 3 ? (
          <>
            {" "}
            <Nav.Link href="/#/uploadpage">upload products</Nav.Link>
            <Nav.Link href="/#/add_items">edit items</Nav.Link>
          </>
        ) : (
          ""
        );
    }
    if (this.props.MyShoppingCarts) {
      this.props.MyShoppingCarts.forEach((cart) => {
        console.log(cart.seller_account);
        this.getAccount(cart.seller_account).then((res) => {
          cartDropDown.push(
            <NavDropdown.Item href={`/#/StorePage/${cart.seller_account}`}>
              <Row>
                <Col xl={6}>{res.data.name}</Col>
                <Col xl={6}>
                  {" "}
                  <Button
                    onClick={() => this.openModal(cart)}
                    className="dropDownBtn"
                    type="button"
                    variant="danger"
                  >
                    {<MdRemoveShoppingCart />}
                  </Button>
                </Col>
              </Row>
            </NavDropdown.Item>
          );
        });
      });
    }
    let shoppingCart = "";
    if (this.props.activeAccount) {
      shoppingCart = this.props.activeAccount ? (
        <NavDropdown title={<FiShoppingCart />} id="navbarScrollingDropdown">
          {cartDropDown}
        </NavDropdown>
      ) : (
        ""
      );
    }
    if (this.props.MySupplierOrders) {
      this.props.MySupplierOrders.forEach((order) => {
        ordersArr.push(
          <NavDropdown.Item href={`/#/supplier-order/${order.id}`}>
            {order.cart_snapshot.buyer_account}{" "}
          </NavDropdown.Item>
        );
      });
    }
    let Orders = "";
    if (this.props.activeAccount) {
      Orders =
        this.props.activeAccount.account_type == 3 ? (
          <NavDropdown
            title={`awaiting approval (${this.props.MySupplierOrders.length})`}
          >
            {ordersArr}
          </NavDropdown>
        ) : null;
    }

    let brand = this.props.activeAccount ? (
      <Navbar.Brand href="/#/">
        {/*this.props.activeAccount.id*/}
        {logo}
      </Navbar.Brand>
    ) : (
      ""
    );
    let creatNewSupplierOrder =
      this.props.activeAccount &&
      this.props.activeAccount.account_type === 3 ? (
        <Nav.Link href={`/#/StorePage/${this.props.activeAccount.id}`}>
          creat new order
        </Nav.Link>
      ) : null;
    let ordersNav = "";
    if (this.props.activeAccount) {
      ordersNav =
        this.props.activeAccount.account_type == 3 ? (
          <NavDropdown title={`orders ${newOrderAwating}`}>
            {" "}
            {Orders}
            {waitingDelivery}
            {awaitingPaymentDropDown}
            {creatNewSupplierOrder}
          </NavDropdown>
        ) : null;
    }

    return (
      <div className="myNavBar">
        <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
          {brand}
          <Navbar.Toggle
            variant="light"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/features">Features</Nav.Link>
              <Nav.Link href="/#/pricing">Pricing</Nav.Link>
              <Nav.Link href="/#/suppliers">suppliers</Nav.Link>
            </Nav>
            <Nav>
              {rootButton}
              {messageBoard}
              {shoppingCart}
              {/* {massages} */}
              {ordersNav}

              {controlPanel}

              {productUpload}
              {user_account}

              {register}
              {login_logout}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal
          loginData={this.props.loginData}
          loginPostData={this.props.loginPostData}
          isOpen={this.props.isOpen}
          closeModal={this.props.closeModal}
        ></LoginModal>

        <>
          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                you are about to delete cart{" "}
                {this.state.modalDeleteItem.seller_account}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>what would you like to do?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteCartAndCloseModal}>
                delete item
              </Button>
              <Button variant="primary" onClick={this.closeModal}>
                go back
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <Modal show={this.state.isMessageBoardOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>change messages board text</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            enter your text here...
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label> </Form.Label>
              <Form.Control
                onChange={this.handleChange}
                placeholder="text here"
                as="textarea"
                name="messageBoardText"
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.updateMessageBoard}>
              update message board
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              go back
            </Button>
          </Modal.Footer>
        </Modal>

        <br />
      </div>
    );
  }
}
export default withRouter(MyNavBar);
