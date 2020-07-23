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

  components = {
    // key name: component, route, acceptable queries
    BugList: [BugList, "bug-list", ""],
    NewBug: [NewBug, "new-bug", ""],
    EditBug: [EditBug, "bug-list", "/:bug_id"],
    AddUser: [AddUser, "add-user", ""],
    EditProject: [EditProject, "edit-project", ""],
  };

  serverRootUrl() {
    return "http://localhost:4000";
  }

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

  constructComponent = (componentName) => {
    let route = "/projects/p/:hash/";
    let endPoint = this.components[componentName][1];
    let queries = this.components[componentName][2];

    let path = route + endPoint + queries;
    let activeLink = endPoint;

    const Component = this.components[componentName][0];

    return this.packageComponentInRoute(path, activeLink, Component);
  };

  packageComponentInRoute = (path, activeLink, Component) => {
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
              {this.constructComponent("BugList")}

              {this.constructComponent("NewBug")}

              {this.constructComponent("EditBug")}

              {this.constructComponent("AddUser")}

              {this.constructComponent("EditProject")}
            </div>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
