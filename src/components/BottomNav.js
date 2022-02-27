import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default class BottomNav extends Component {
  render() {
    return (
      <Navbar
        fixed="bottom"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/privecy_policy_sapakos">
                מדיניות הפרטיות
              </Nav.Link>
              <Nav.Link href="/#/terms_of_use_sapakos">תנאי שימוש</Nav.Link>
            </Nav>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
