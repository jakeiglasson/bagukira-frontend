import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/Global.css";
import { Button, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Media from "react-media";

class NavBar extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    this.setState({ hash: localStorage.hash });
    let { hash } = this.props.match.params;
    if (this.getProject(hash)) {
      this.setState({ loading: false });
    }
  };

  purgeLocalStorage = async () => {
    await localStorage.clear();
  };

  getProject = async (hash) => {
    const endPoint = "/units/";

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + endPoint + hash
      );
      if (response.status === 200) {
        this.setState({ project: response.data.units });
        localStorage.setItem("projectOwnerId", response.data.units.user_id);
        localStorage.setItem("projectName", response.data.units.name);
        return true;
      }
    } catch (error) {
      alert(`Error: ${error}`);
      return false;
    }
  };

  renderWelcomeMessage = () => {
    const welcomeMessage = "Welcome to Bagukira!";

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

  conditionalNavButtons = (onProjectView) => {
    let admin = false;
    const hash = this.props.match.params.hash;
    const userId = parseInt(localStorage.userId);

    if (
      userId === localStorage.projectOwnerId &&
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
                href={`/projects/p/${hash}/bugs`}
                variant="outline-warning"
                className=""
              >
                BUG LIST
              </Nav.Link>
              <Nav.Link
                href={`/projects/p/${hash}/bug/new`}
                variant="outline-warning"
                className=""
              >
                NEW BUG
              </Nav.Link>
              {admin && (
                <>
                  <Nav.Link
                    href={`/projects/p/${hash}/user/add`}
                    variant="outline-warning"
                    className=""
                  >
                    ADD USER
                  </Nav.Link>
                  <Nav.Link
                    href={`/projects/p/${hash}/edit`}
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
                href={`/projects/p/${hash}/bugs`}
                variant="outline-warning"
                className=""
              >
                BUG LIST
              </Nav.Link>
              <Nav.Link
                href={`/projects/p/${hash}/bug/new`}
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
