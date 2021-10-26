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

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myUsers: [],
    };
  }
  getMyUsers = () => {
    if (this.props.activeAccount) {
      getData(
        `${domain}/my-users/?account_id=${this.props.activeAccount.id}`,
        "",
        ` ${this.props.accessToken}`
      ).then((data) => {
        console.log(data);
        this.setState({ myUsers: data.results });
      });
    }
  };
  componentDidMount() {
    this.getMyUsers();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeAccount !== prevProps.activeAccount) {
      this.getMyUsers();
    }
  }
  render() {
    if (!this.state.myUsers) {
      return <FullPageLoader></FullPageLoader>;
    } else
      return (
        <div className="ControlPanelPage">
          <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
              <Nav>
                <NavLink href="/#/control_panel/manage_users">
                  manage user{" "}
                </NavLink>
                <NavLink href="/#/control_panel/manage_clients">
                  manage clients{" "}
                </NavLink>
                <NavLink href="/#/control_panel/manage_orders">
                  manage orders{" "}
                </NavLink>
                <NavLink href="/#/control_panel/manage_discounts">
                  manage discounts{" "}
                </NavLink>
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
              getMyUsers={this.getMyUsers}
              myUsers={this.state.myUsers}
              accessToken={this.props.accessToken}
              activeAccount={this.props.activeAccount}
              link={"/#/control_panel/manage_users"}
            ></ManageUsers>
          </Route>
          <Route exact path="/control_panel/manage_orders/">
            <ManageOrders></ManageOrders>
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
        </div>
      );
  }
}
export default withRouter(ControlPanel);
