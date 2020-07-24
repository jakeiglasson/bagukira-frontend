import React, { Component } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";

import "./App.css";

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarActiveLink: "",
    };
  }

  components = {
    // key name: component, route, acceptable queries
    BugList: {
      component: BugList,
      route: "bugs",
      accepted_queries: "",
    },
    NewBug: {
      component: NewBug,
      route: "bug/new",
      accepted_queries: "",
    },
    EditBug: {
      component: EditBug,
      route: "bugs/b",
      accepted_queries: "/:bug_id",
    },
    AddUser: {
      component: AddUser,
      route: "user/add",
      accepted_queries: "",
    },
    EditProject: {
      component: EditProject,
      route: "edit",
      accepted_queries: "",
    },
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
        <Route
          exact
          path="/projects/new"
          render={(props) => (
            <NewProject serverRootUrl={this.serverRootUrl()} {...props} />
          )}
        />
      </>
    );
  };

  constructComponent = (componentName) => {
    let route = "/projects/p/:hash/";

    let endPoint = this.components[componentName].route;
    let queries = this.components[componentName].accepted_queries;

    let path = route + endPoint + queries;
    let activeLink = endPoint;

    const Component = this.components[componentName].component;

    return this.packageComponentInRoute(path, activeLink, Component);
  };

  packageComponentInRoute = (path, activeLink, Component) => {
    return (
      <Route
        exact
        path={path}
        render={(props) => (
          <Component
            serverRootUrl={this.serverRootUrl()}
            className="spgc-main-content"
            {...props}
          />
        )}
      />
    );
  };

  setActiveLink = (text) => {
    this.setState({ activeLink: text });
  };

  render() {
    return (
      <BrowserRouter>
        {this.bagukiraTitle()}
        <Route path="/projects" component={NavBar} />
        {this.exactPathRoutes()}

        <Route
          path="/projects/p/:hash"
          render={(props) => (
            <div className="content-container">
              <div className="single-project-grid-container">
                <SideBar
                  // activeLink="{activeLink}"
                  serverRootUrl={this.serverRootUrl()}
                  className="spgc-side-nav"
                  setActiveLink={this.setActiveLink.bind(this)}
                  {...props}
                />
                {this.constructComponent("BugList")}

                {this.constructComponent("NewBug")}

                {this.constructComponent("EditBug")}

                {this.constructComponent("AddUser")}

                {this.constructComponent("EditProject")}
              </div>
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
