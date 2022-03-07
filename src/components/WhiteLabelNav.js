import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Container,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { MdRemoveShoppingCart } from "react-icons/md";
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
    let creatAccount =
      !this.props.activeAccount &&
      this.props.userAccounts.length == 0 &&
      this.props.accessToken ? (
        <Nav.Link href="#createAccount">צור חשבון</Nav.Link>
      ) : (
        ""
      );
    console.log(this.props.activeAccount);
    let logInOut = !this.props.accessToken ? (
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
    let creatUser = !this.props.activeAccount ? (
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
        <Nav.Link href="/#/feed">עדכונים</Nav.Link>
      ) : null;
    let vibretOrders =
      this.props.MySupplierOrders.length > 0
        ? "animate__animated animate__headShake animate__repeat-3		"
        : "";

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

    // const user_account =
    //   this.props.accessToken && this.props.userAccounts == 0 ? (
    //     <>
    //       <Nav.Link href="/#/openAccount">צור חשבון</Nav.Link>{" "}
    //     </>
    //   ) : null;
    // const register = !this.props.accessToken ? (
    //   <Nav.Link
    //     className={
    //       "animate__animated animate__headShake animate__infinite animate__slower animate__delay-2s	"
    //     }
    //     href="/#/register"
    //   >
    //     הירשם חינם!
    //   </Nav.Link>
    // ) : null;

    // const login_logout = !this.props.accessToken ? (
    //   <Nav.Link
    //     className={`animate__animated animate__headShake animate__infinite  animate__delay-0.5s	`}
    //     href={`${window.location}`}
    //     onClick={() => this.props.openModal()}
    //   >
    //     התחבר
    //   </Nav.Link>
    // ) : (
    //   <Nav.Link href={`${window.location}`} onClick={() => this.props.logout()}>
    //     התנתק מ-{`${this.props.me.email}`}{" "}
    //   </Nav.Link>
    // );
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
              {creatUser}
              {profile}
              {ordersNav}
              {creatAccount}{" "}
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
