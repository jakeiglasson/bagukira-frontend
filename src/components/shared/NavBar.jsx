import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Global.css";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";

class NavBar extends Component {
  purgeLocalStorage = () => {
    console.log(localStorage);
    // localStorage.removeItem("userId", "token");
    localStorage.clear();
    console.log(localStorage);
  };

  renderWelcomeMessage = () => {
    // console.log(localStorage);
    let welcomeMessage;
    if (localStorage.getItem("userId") === null) {
      welcomeMessage = "Welcome, to Bagukira!";
    } else {
      welcomeMessage =
        "Welcome " + localStorage.getItem("userEmail") + ", to Bagukira!";
    }
    return (
      <Nav className="mr-auto">
        <Navbar.Brand>{welcomeMessage}</Navbar.Brand>
      </Nav>
    );
  };

  navButtons = () => {
    return (
      <>
        {localStorage.userId && (
          <>
            <Route path="/projects/:id">
              <Button
                variant="outline-warning"
                className="mx-2"
                href="/projects"
              >
                ALL PROJECTS
              </Button>
            </Route>

            <Link to="/" onClick={this.purgeLocalStorage.bind(this)}>
              <Button variant="outline-warning" className="mx-2">
                SIGN OUT
              </Button>
            </Link>
          </>
        )}
        {!localStorage.userId && (
          <>
            <Link to="/login" onClick={this.purgeLocalStorage.bind(this)}>
              <Button variant="outline-warning" className="mx-2">
                LOG IN
              </Button>
            </Link>
            <Link to="/login" onClick={this.purgeLocalStorage.bind(this)}>
              <Button variant="outline-warning" className="mx-2">
                SIGN UP
              </Button>
            </Link>
          </>
        )}
      </>
    );
  };

  render() {
    // console.log(localStorage);
    return (
      <Navbar bg="dark" variant="dark" className="">
        {this.renderWelcomeMessage()}

        {this.navButtons()}
      </Navbar>
    );
  }
}

export default NavBar;
