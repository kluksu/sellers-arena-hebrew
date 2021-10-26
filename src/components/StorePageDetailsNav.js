import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class StorePageDetailsNav extends React.Component {
  render() {
    let buttonsMargin = this.props.screenWith < 479 ? "" : "10px";
    if (!this.props.activeAccount) {
      return null;
    } else {
      return (
        <div className="stickyNav">
          <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <p className="FormRejects">{this.props.cartsError}</p>
              </Nav>
              <Button
                style={{ marginBottom: buttonsMargin }}
                type="button"
                onClick={this.props.addCartItems}
                variant="success"
              >
                add to order
              </Button>
              <Button
                type="button"
                onClick={this.props.addCartItemsAndCheckout}
                variant="success"
              >
                add items and go to checkout
              </Button>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}
export default withRouter(StorePageDetailsNav);
