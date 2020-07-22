import React, { Component } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
import NewProject from "./components/NewProject";
import NavBar from "./components/shared/NavBar";
import SideBar from "./components/shared/SideBar";
import BugList from "./components/BugList";
import EditBug from "./components/EditBug";
import NewBug from "./components/NewBug";
import AddUser from "./components/AddUser";
import EditProject from "./components/EditProject";
import "./App.css";
import { Nav } from "react-bootstrap";

class App extends Component {
  state = {
    sideBarActiveLink: "",
  };

  serverRootUrl() {
    return "http://localhost:4000";
  }

  // handleHistory = (props) => {
  //   let { history } = this.state;
  //   this.setState({ history: history.push(props) });
  // };

  bagukiraTitle = () => {
    return (
      <div className="text-center display-1 py-3 banner-text">
        <Link to="/" className="text-link">
          <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} /> Bagukira{" "}
          <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
        </Link>
      </div>
    );
  };

  render() {
    return (
      <BrowserRouter>
        {this.bagukiraTitle()}
        <Route path="/projects" component={NavBar} />
        <Route
          exact
          path="/projects"
          render={(props) => (
            <Projects {...props} serverRootUrl={this.serverRootUrl()} />
          )}
        />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/projects/new" component={NewProject} />
        <Route path="/projects/p">
          <div className="content-container">
            <div className="single-project-grid-container">
              <Route
                exact
                path="/projects/p/:hash/bug-list"
                render={(props) => (
                  <>
                    <SideBar activeLink="bug-list" />
                    <BugList serverRootUrl={this.serverRootUrl()} {...props} />
                  </>
                )}
              />
              <Route
                exact
                path="/projects/p/:hash/bug-list/:bug_id"
                render={(props) => (
                  <>
                    <SideBar activeLink="bug-list" />
                    <EditBug serverRootUrl={this.serverRootUrl()} {...props} />
                  </>
                )}
              />

              <Route path="/projects/p/:hash/new-bug">
                <SideBar activeLink="new-bug" />
                <NewBug />
              </Route>
              <Route path="/projects/p/:hash/add-user">
                <SideBar activeLink="add-user" />
                <AddUser />
              </Route>
              <Route path="/projects/p/:hash/edit-project">
                <SideBar activeLink="edit-project" />
                <EditProject />
              </Route>
            </div>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
