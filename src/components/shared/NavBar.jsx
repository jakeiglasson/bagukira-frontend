import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Global.css";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" className="">
        <Nav className="mr-auto">
          <Navbar.Brand href="#home">Weclome, Johndoe@gmail.com</Navbar.Brand>
        </Nav>
        <Form inline>
          <Button variant="outline-warning" className="mx-2">
            ALL PROJECTS
          </Button>
          <Button variant="outline-warning" className="mx-2">
            SIGN OUT
          </Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavBar;
