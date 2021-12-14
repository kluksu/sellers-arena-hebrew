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
import { BsPerson } from "react-icons/bs";

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
    let vibretOrders =
      this.props.MySupplierOrders.length > 0
        ? "animate__animated animate__headShake animate__repeat-3		"
        : "";
    let profile = this.props.activeAccount ? (
      <NavLink href="/#/me">
        {" "}
        <BsPerson></BsPerson>
      </NavLink>
    ) : null;
    console.log(this.props.me);
    let rootButton =
      this.props.activeAccount && this.props.activeAccount.id == 1 ? (
        <Nav.Link href="/#/rootPage">משתמש ראשי</Nav.Link>
      ) : null;
    let newOrderAwating =
      this.props.MySupplierOrders.length > 0
        ? `(${this.props.MySupplierOrders.length} חדשות)`
        : "";
    let awaitingPayment = [];
    this.props.fulfilledOrders.forEach((fulfilledorder) => {
      awaitingPayment.push(
        <NavDropdown.Item href={`/#/supplier-order/${fulfilledorder.id}`}>
          {fulfilledorder.buyer_account.name}
        </NavDropdown.Item>
      );
    });
    let awaitingPaymentDropDown = (
      <NavDropdown title={`מחכים לתשלום (${awaitingPayment.length})`}>
        {awaitingPayment}
      </NavDropdown>
    );
    let messageBoard =
      this.props.activeAccount && this.props.activeAccount.account_type == 3 ? (
        <NavLink
          href={`${window.location}`}
          onClick={this.openMessagesBoardModal}
        >
          לוח הודעות
        </NavLink>
      ) : null;
    console.log(this.props.MyShoppingCarts);
    let cartDropDown = [];
    let ordersArr = [];
    let waitingDeliveryArr = [];
    this.props.sellerApprovedOrders.forEach((approvedOrder) => {
      waitingDeliveryArr.push(
        <NavDropdown.Item href={`/#/supplier-order/${approvedOrder.id}`}>
          {approvedOrder.buyer_account.name}
        </NavDropdown.Item>
      );
    });
    let waitingDelivery = "";
    if (this.props.activeAccount) {
      waitingDelivery = this.props.activeAccount.account_type ? (
        <NavDropdown
          title={`מחכים למשלוח (${this.props.sellerApprovedOrders.length})`}
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
          <Nav.Link href="/#/openAccount">צור חשבון</Nav.Link>{" "}
        </>
      ) : null;
    const register = !this.props.accessToken ? (
      <Nav.Link
        className={
          "animate__animated animate__headShake animate__infinite animate__slower animate__delay-2s	"
        }
        href="/#/register"
      >
        הירשם
      </Nav.Link>
    ) : null;

    const login_logout = !this.props.accessToken ? (
      <Nav.Link
        className={`animate__animated animate__headShake animate__infinite  animate__delay-0.5s	`}
        href={`${window.location}`}
        onClick={() => this.props.openModal()}
      >
        התחבר
      </Nav.Link>
    ) : (
      <Nav.Link href={`${window.location}`} onClick={() => this.props.logout()}>
        התנתק מ-{`${this.props.me.email}`}{" "}
      </Nav.Link>
    );
    let productUpload = "";
    if (this.props.activeAccount) {
      productUpload =
        this.props.activeAccount.account_type == 3 ? (
          <>
            {" "}
            <Nav.Link href="/#/uploadpage">העלאת מוצר</Nav.Link>
            <Nav.Link href="/#/add_items">עריכת מוצר</Nav.Link>
          </>
        ) : (
          ""
        );
    }
    if (this.props.MyShoppingCarts) {
      this.props.MyShoppingCarts.forEach((cart) => {
        console.log(cart);
        this.getAccount(cart.buyer_account).then((res) => {
          console.log(res);
          cartDropDown.push(
            <NavDropdown.Item href={`/#/StorePage/${cart.seller_account}`}>
              {res.data.name}{" "}
              <Button
                onClick={() => this.openModal(cart)}
                className="dropDownBtn"
                type="button"
                variant="danger"
              >
                {<MdRemoveShoppingCart />}
              </Button>
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
        console.log(order);
        ordersArr.push(
          <NavDropdown.Item href={`/#/supplier-order/${order.id}`}>
            {order.buyer_account.name}{" "}
          </NavDropdown.Item>
        );
      });
    }
    let Orders = "";
    if (this.props.activeAccount) {
      Orders = this.props.activeAccount.account_type ? (
        <NavDropdown title={`חדשות (${this.props.MySupplierOrders.length})`}>
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
          צור הזמנה
        </Nav.Link>
      ) : null;
    let ordersNav = "";
    if (this.props.activeAccount) {
      ordersNav = this.props.activeAccount.account_type ? (
        <NavDropdown
          className={`${vibretOrders}`}
          title={`הזמנות ${newOrderAwating}`}
        >
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
            <Nav className="ml-auto">
              <Nav.Link href="/#/">ראשי</Nav.Link>
              {/* <Nav.Link href="/#/features">שימושים</Nav.Link> */}
              <Nav.Link href="/#/pricing">מחירון</Nav.Link>
              <Nav.Link href="/#/suppliers">ספקים</Nav.Link>
            </Nav>
            <Nav>
              {rootButton}
              {messageBoard}
              {shoppingCart}
              {profile}
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
        <Modal show={this.state.isMessageBoardOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>שנה את לוח המודעות</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            הקש את תוכן ההודעה פה...{" "}
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
              עדכן
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              חזור
            </Button>
          </Modal.Footer>
        </Modal>

        <br />
      </div>
    );
  }
}
export default withRouter(MyNavBar);
