import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class StorePageDetailsNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
    };
  }
  render() {
    let buttonsMargin = this.props.screenWith < 479 ? "" : "10px";
    if (!this.props.activeAccount) {
      return null;
    } else {
      return (
        <div className="stickyNav">
          <Navbar
            expanded={this.state.isExpanded}
            collapseOnSelect
            expand="xl"
            bg="light"
            variant="light"
          >
            <Navbar.Toggle
              onClick={() => {
                this.setState({
                  isExpanded: this.state.isExpanded === true ? false : true,
                });
              }}
              aria-controls="responsive-navbar-nav"
            />
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
                הוסף להזמנה
              </Button>
              <Button
                type="button"
                onClick={this.props.addCartItemsAndCheckout}
                variant="success"
              >
                הוסף ועבור לעמוד סיום הזמנה
              </Button>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}
export default withRouter(StorePageDetailsNav);
