import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  ListGroup,
  Col,
  Row,
  NavLink,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Route, withRouter } from "react-router-dom";
import ManageUsers from "../pages/ManageUsers";
import ManageOrders from "../components/ManageOrders";
import { domain, getData } from "../components/utils";
import FullPageLoader from "../components/FullPageLoader";
import AddUnregisterdAccount from "../components/AddUnregisterdAccount";
import AllOrders from "./AllOrders";
import AccountPrefrences from "../components/AccountPrefrences";
import SeparateAccountsManage from "../components/SeparateAccountsManage";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // myUsers: [],
    };
  }

  componentDidMount() {
    // this.getMyUsers();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      // this.getMyUsers();
    }
  }
  render() {
    // if (!this.props.myUsers) {
    //   return <FullPageLoader></FullPageLoader>;
    // } else
    return (
      <div className="ControlPanelPage">
        <Navbar expand="lg" bg="primary" variant="dark">
          <Container>
            <Nav>
              <NavLink href="/#/control_panel/manage_users">משתמשים </NavLink>
              <NavLink href="/#/control_panel/manage_clients">לקוחות </NavLink>
              <NavLink href="/#/control_panel/manage_orders">הזמנות </NavLink>
              <NavLink href="/#/control_panel/manage_discounts">הנחות </NavLink>
              <NavLink href="/#/control_panel/account_prefrences">
                העדפות{" "}
              </NavLink>
              {/* {this.props.href !== "" ? ( */}
              <NavLink href="/#/control_panel/manage_separate_accounts">
                נהל קונים{" "}
              </NavLink>
              {/* ) : (
                ""
              )} */}
            </Nav>
          </Container>
        </Navbar>

        {/* <Col xl={2} xs={3}>
              <ListGroup>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_users">
                    manage user{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_clients">
                    manage clients{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_orders">
                    manage orders{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_discounts">
                    manage discounts{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_users">
                    manage user{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_users">
                    manage user{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_users">
                    manage user{" "}
                  </NavLink>
                </ListGroup.Item>
                <ListGroup.Item action variant="light">
                  <NavLink href="/#/control_panel/manage_users">
                    manage user{" "}
                  </NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col> */}
        <Route exact path="/control_panel/manage_users/">
          <ManageUsers
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            // getMyUsers={this.getMyUsers}
            myUsers={this.props.myUsers}
            accessToken={this.props.accessToken}
            activeAccount={this.props.activeAccount}
            link={"/#/control_panel/manage_users"}
          ></ManageUsers>
        </Route>
        <Route exact path="/control_panel/manage_orders/">
          {/* <ManageOrders></ManageOrders> */}
          <AllOrders
            myContacts={this.props.myContacts}
            screenWidth={this.props.screenWidth}
            payedOrders={this.props.payedOrders}
            fulfilledOrders={this.props.fulfilledOrders}
            sellerApprovedOrders={this.props.sellerApprovedOrders}
            MySupplierOrders={this.props.MySupplierOrders}
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
          ></AllOrders>
        </Route>
        <Route exact path="/control_panel/manage_clients/">
          <AddUnregisterdAccount
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            accessToken={this.props.accessToken}
            activeAccount={this.props.activeAccount}
          ></AddUnregisterdAccount>
          {/* <ManageOrders></ManageOrders> */}
        </Route>
        <Route exact path="/control_panel/manage_separate_accounts/">
          <SeparateAccountsManage
            activeAccount={this.props.activeAccount}
            accessToken={this.props.accessToken}
            deleteAccount={this.props.deleteAccount}
            resetPassword={this.props.resetPassword}
            me={this.props.me}
            href={this.props.href}
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
          ></SeparateAccountsManage>
          {/* <ManageOrders></ManageOrders> */}
        </Route>
        <Route exact path="/control_panel/account_prefrences/">
          <AccountPrefrences
            closeGenericModal={this.props.closeGenericModal}
            openGenericModal={this.props.openGenericModal}
            accessToken={this.props.accessToken}
            activeAccount={this.props.activeAccount}
          ></AccountPrefrences>
          {/* <ManageOrders></ManageOrders> */}
        </Route>
      </div>
    );
  }
}
export default withRouter(ControlPanel);
