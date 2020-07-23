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

  exactPathRoutes = () => {
    return (
      <>
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
      </>
    );
  };

  bugListRoute = () => {
    return (
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
    );
  };

  bugEditRoute = () => {
    return (
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
    );
  };

  newBugRoute = () => {
    return (
      <Route path="/projects/p/:hash/new-bug">
        <SideBar activeLink="new-bug" />
        <NewBug />
      </Route>
    );
  };

  // addUserRoute = () => {
  //   return (
  //     <Route path="/projects/p/:hash/add-user">
  //       <SideBar activeLink="add-user" />
  //       <AddUser />
  //     </Route>
  //   );
  // };

  addUserRoute = () => {
    const path = "/projects/p/:hash/add-user";
    const activeLink = "add-user";
    const Component = () => {
      return <AddUser />;
    };
    return this.packageRoute(path, activeLink, Component);
  };

  // editProjectRoute = () => {
  //   return (
  //     <Route path="/projects/p/:hash/edit-project">
  //       {this.sideBar("edit-project")}
  //       <EditProject />
  //     </Route>
  //   );
  // };

  editProjectRoute = () => {
    const path = "/projects/p/:hash/edit-project";
    const activeLink = "edit-project";
    const Component = () => {
      return <EditProject />;
    };
    return this.packageRoute(path, activeLink, Component);
  };

  packageRoute = (path, activeLink, Component) => {
    return (
      <Route
        exact
        path={path}
        render={(props) => (
          <>
            <SideBar
              activeLink={activeLink}
              serverRootUrl={this.serverRootUrl()}
              {...props}
            />
            <Component serverRootUrl={this.serverRootUrl()} {...props} />
          </>
        )}
      />
    );
  };

  render() {
    return (
      <BrowserRouter>
        {this.bagukiraTitle()}
        <Route path="/projects" component={NavBar} />
        {this.exactPathRoutes()}

        <Route path="/projects/p">
          <div className="content-container">
            <div className="single-project-grid-container">
              {this.bugListRoute()}

              {this.bugEditRoute()}

              {this.newBugRoute()}

              {this.addUserRoute()}

              {this.editProjectRoute()}
            </div>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
