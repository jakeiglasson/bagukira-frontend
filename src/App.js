import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
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
import ProjectName from "./components/ProjectName";

class App extends Component {
  state = {
    sideBarActiveLink: "",
  };
  constructor(props) {
    super(props);
    document.title = "Bagukira: Bug Killer";
  }

  // key name: component, route, acceptable queries
  components = {
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

  setAppState = (stateName, value) => {
    this.setState({ [stateName]: value });
  };

  serverRootUrl() {
    return "http://localhost:4000";
  }

  bagukiraTitle = () => {
    return (
      <div className="text-center display-1 py-3 banner-text">
        <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} /> Bagukira{" "}
        <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
      </div>
    );
  };

  constructComponent = (component) => {
    const route = "/projects/p/:hash/";

    const endPoint = component.route;
    const queries = component.accepted_queries;

    const path = route + endPoint + queries;
    const activeLink = endPoint;

    const Component = component.component;

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
      <>
        {this.bagukiraTitle()}
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/projects" component={NavBar} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/new" component={NewProject} />
          <Route
            exact
            path="/projects/p/:hash"
            render={(props) => (
              <Redirect
                to={"/projects/p/" + props.match.params.hash + "/bugs"}
              />
            )}
          />

          <Route
            path="/projects/p/:hash"
            render={(props) => (
              <>
                <NavBar {...props} />
                <ProjectName {...props} />
                <div className="content-container">
                  <div className="single-project-grid-container">
                    <SideBar
                      serverRootUrl={this.serverRootUrl()}
                      className="spgc-side-nav"
                      setActiveLink={this.setActiveLink}
                      {...props}
                    />
                    {this.constructComponent(this.components.BugList)}

                    {this.constructComponent(this.components.NewBug)}

                    {this.constructComponent(this.components.EditBug)}

                    <ProtectedRoute
                      path={"/projects/p/:hash/user/add"}
                      component={AddUser}
                    />
                    <ProtectedRoute
                      path={"/projects/p/:hash/edit"}
                      component={EditProject}
                    />
                    {this.constructComponent(this.components.AddUser)}

                    {this.constructComponent(this.components.EditProject)}
                  </div>
                </div>
              </>
            )}
          />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
