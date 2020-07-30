import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/Global.css";
import { Button, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Media, { useMedia } from "react-media";

class NavBar extends Component {
  state = {
    loading: true,
  };

  componentWillMount = () => {
    this.setState({ hash: localStorage.hash });

    let { hash } = this.props.match.params;
    this.getProject(hash);
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  purgeLocalStorage = async () => {
    await localStorage.clear();
  };

  getProject = async (hash) => {
    const endPoint = "/units/";
    await axios
      .get(process.env.REACT_APP_API_URL + endPoint + hash)
      .then((response) => {
        this.setState({ project: response.data.units });
        localStorage.setItem("projectOwnerId", response.data.units.user_id);
        localStorage.setItem("projectName", response.data.units.name);
        // localStorage.setItem("hash", response.data.units.hash);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderWelcomeMessage = () => {
    let welcomeMessage = "Welcome to Bagukira!";

    return (
      <Nav className="mr-auto">
        <Navbar.Brand>{welcomeMessage}</Navbar.Brand>
      </Nav>
    );
  };

  // if (localStorage.userId == localStorage.projectOwnerId)

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

  conditionalNavButtons = (onProjectView) => {
    let admin = false;
    let hash = this.props.match.params.hash;

    if (
      localStorage.userId == localStorage.projectOwnerId &&
      window.location.href.includes(`/projects/p/${hash}`)
    ) {
      admin = true;
    }

    if (onProjectView) {
      return (
        <>
          {localStorage.userId && (
            <>
              {/* REMOVED Link because when clicked it doesn't render /projects initially, user has to force a reload */}
              <Nav.Link
                href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/bugs`}
                variant="outline-warning"
                className=""
              >
                BUG LIST
              </Nav.Link>
              <Nav.Link
                href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/bug/new`}
                variant="outline-warning"
                className=""
              >
                NEW BUG
              </Nav.Link>
              {admin && (
                <>
                  <Nav.Link
                    href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/user/add`}
                    data-testid={`linkTestADD USER`}
                    variant="outline-warning"
                    className=""
                  >
                    ADD USER
                  </Nav.Link>
                  <Nav.Link
                    href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/edit`}
                    data-testid={`linkTestEDIT PROJECT`}
                    variant="outline-warning"
                    className=""
                  >
                    EDIT PROJECT
                  </Nav.Link>
                </>
              )}
              <Nav.Link variant="outline-warning" className="" href="/projects">
                ALL PROJECTS
              </Nav.Link>
              <Nav.Link
                href="/"
                variant="outline-warning"
                className=""
                onClick={this.purgeLocalStorage}
              >
                SIGN OUT
              </Nav.Link>
            </>
          )}
          {!localStorage.userId && (
            <>
              <Nav.Link
                href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/bugs`}
                variant="outline-warning"
                className=""
              >
                BUG LIST
              </Nav.Link>
              <Nav.Link
                href={`${process.env.REACT_APP_FE_URL}/projects/p/${hash}/bug/new`}
                variant="outline-warning"
                className=""
              >
                NEW BUG
              </Nav.Link>

              <Nav.Link variant="outline-warning" href="/login">
                LOG IN
              </Nav.Link>

              <Nav.Link variant="outline-warning" href="/signup">
                SIGN UP
              </Nav.Link>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {localStorage.userId && (
            <>
              {/* REMOVED Link because when clicked it doesn't render /projects initially, user has to force a reload */}
              <Nav.Link variant="outline-warning" className="" href="/projects">
                ALL PROJECTS
              </Nav.Link>
              <Nav.Link
                href="/"
                variant="outline-warning"
                className=""
                onClick={this.purgeLocalStorage}
              >
                SIGN OUT
              </Nav.Link>
            </>
          )}
          {!localStorage.userId && (
            <>
              <Nav.Link variant="outline-warning" href="/login">
                LOG IN
              </Nav.Link>

              <Nav.Link variant="outline-warning" href="/signup">
                SIGN UP
              </Nav.Link>
            </>
          )}
        </>
      );
    }
  };

  desktopNavBar() {
    return (
      <Navbar bg="dark" variant="dark" className="">
        {this.renderWelcomeMessage()}
        {this.navButtons()}
      </Navbar>
    );
  }

  conditionalRenderNavBar = () => {
    let check;
    if (localStorage.projectOwnerId && !this.state.loading) {
      check = true;
    } else {
      check = false;
    }

    if (
      !window.location.href.includes(
        `/projects/p/${this.props.match.params.hash}`
      )
    ) {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            {this.renderWelcomeMessage()}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            data-testid="mToggle"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">{this.conditionalNavButtons(false)}</Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      if (check) {
        return (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              {this.renderWelcomeMessage()}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">{this.conditionalNavButtons(true)}</Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      } else {
        return <div className="loading-overlay"></div>;
      }
    }
  };

  renderThroughMediaQuery = (ticket) => {
    return (
      <div>
        <Media
          queries={{
            desktop: "(min-width: 1025px)",
            tablet: "(min-width: 481px) and (max-width: 1024px)",
            mobile: "(min-width: 320px) and (max-width: 480px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.desktop && this.desktopNavBar()}
              {matches.tablet && this.conditionalRenderNavBar()}
              {matches.mobile && this.conditionalRenderNavBar()}
            </Fragment>
          )}
        </Media>
      </div>
    );
  };

  render() {
    return <>{this.renderThroughMediaQuery()}</>;
  }
}

export default NavBar;

// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//       <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//     <Nav>
//       <Nav.Link href="#deets">More deets</Nav.Link>
//       <Nav.Link eventKey={2} href="#memes">
//         Dank memes
//       </Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>;
