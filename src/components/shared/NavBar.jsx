import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Global.css";
import { Button, Navbar, Nav } from "react-bootstrap";

class NavBar extends Component {
  purgeLocalStorage = async () => {
    console.log(localStorage);
    // localStorage.removeItem("userId", "token");
    await localStorage.clear();
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
            {/* REMOVED Link because when clicked it doesn't render /projects initially, user has to force a reload */}
            <Button variant="outline-warning" className="mx-2" href="/projects">
              ALL PROJECTS
            </Button>

            <Button
              href="/"
              variant="outline-warning"
              className="mx-2"
              onClick={this.purgeLocalStorage}
            >
              SIGN OUT
            </Button>
          </>
        )}
        {!localStorage.userId && (
          <>
            <Link to="/login">
              <Button variant="outline-warning" className="mx-2">
                LOG IN
              </Button>
            </Link>
            <Link to="/login">
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
