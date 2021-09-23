import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav } from "react-bootstrap";

function navbar() {
  return (
    <Navbar variant="dark" className="navbar">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto ">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default navbar;
