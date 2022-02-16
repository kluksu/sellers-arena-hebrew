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
  NavItem,
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
import { domain, handleKeyDown, logo } from "./utils";

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
    let allOrders = <Nav.Link href="/#/all-orders">כל ההזמנות</Nav.Link>;
    let path =
      this.props.activeAccount && this.props.activeAccount.account_type == 2
        ? "my-order"
        : "supplier-order";
    let wall =
      this.props.activeAccount && this.props.activeAccount.account_type == 3 ? (
        <Nav.Link href="/#/wall"> העדכונים שלי</Nav.Link>
      ) : null;
    let feed =
      this.props.activeAccount && this.props.activeAccount.account_type == 2 ? (
        <Nav.Link href="/#/feed">עדכוני ספקים </Nav.Link>
      ) : null;
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
      let sellerOrBuyer =
        this.props.activeAccount.account_type == 3
          ? fulfilledorder.buyer_account.name
          : fulfilledorder.seller_account.name;
      awaitingPayment.push(
        <NavDropdown.Item href={`/#/${path}/${fulfilledorder.id}`}>
          {sellerOrBuyer}
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

    let cartDropDown = [];
    let ordersArr = [];
    let waitingDeliveryArr = [];
    this.props.sellerApprovedOrders.forEach((approvedOrder) => {
      let buyerOrSeller =
        this.props.activeAccount.account_type == 3
          ? approvedOrder.buyer_account.name
          : approvedOrder.seller_account.name;
      waitingDeliveryArr.push(
        <NavDropdown.Item href={`/#/${path}/${approvedOrder.id}`}>
          {buyerOrSeller}
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
            <NavDropdown title="עריכת מוצר">
              {" "}
              <NavLink href="/#/add_items">עריכת מוצר</NavLink>
              <NavLink href="/#/edit-multiple">עריכה וריאציות מהירה</NavLink>
              <NavLink href="/#/edit-multiple-items">עריכה פריט מהירה</NavLink>
            </NavDropdown>
          </>
        ) : (
          ""
        );
    }
    if (this.props.MyShoppingCarts && this.props.activeAccount) {
      this.props.MyShoppingCarts.forEach((cart) => {
        this.props
          .getAccount(
            this.props.activeAccount.account_type == 2
              ? cart.seller_account
              : cart.buyer_account
          )
          .then((res) => {
            //
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
        let buyerOrSeller =
          this.props.activeAccount.account_type == 3
            ? order.buyer_account.name
            : order.seller_account.name;
        ordersArr.push(
          <NavDropdown.Item href={`/#/${path}/${order.id}`}>
            {buyerOrSeller}{" "}
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

    let brand =
      this.props.activeAccount || !this.props.activeAccount ? (
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
          {creatNewSupplierOrder}
          {Orders}
          {waitingDelivery}
          {awaitingPaymentDropDown}
          {allOrders}
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
              {!this.props.activeAccount ? (
                <Nav.Link href="/#/features">עלינו</Nav.Link>
              ) : (
                ""
              )}
              {/* <Nav.Link href="/#/pricing">מחירון</Nav.Link> */}
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
              {wall}
              {feed}
              {register}
              {login_logout}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginModal
          openGenericModal={this.props.openGenericModal}
          closeGenericModal={this.props.closeGenericModal}
          resetPassword={this.props.resetPassword}
          handleKeyDown={this.props.handleKeyDown}
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
        <Modal
          show={this.state.isMessageBoardOpen}
          onHide={this.closeModal}
          onKeyDown={(event) => handleKeyDown(event, this.updateMessageBoard)}
        >
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
