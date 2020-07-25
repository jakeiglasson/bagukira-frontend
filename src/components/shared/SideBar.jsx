import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  constructor(props) {
    super(props);
    console.log("SideBar > constructor");
    console.log("|-> props:", this.props);
    console.log("|-> local storage:", localStorage);
    this.state = {
      root: "",
      hash: this.props.match.params.hash,
      permission: false,
    };
    console.log("|-> state:", this.state);
  }
  componentWillMount = () => {
    // console.log("SideBar > componentWillMount");
    let { hash } = this.props.match.params;
    this.setState({ root: "/projects/p/" + hash + "/" });
    this.getProjectName(hash);

    this.checkForCorrectLoggedInUser();
  };

  componentWillUpdate = () => {
    console.log("componentWillUpdate");
    console.log(this.state);
  };

  checkForCorrectLoggedInUser = () => {
    let match = false;
    if (localStorage.userEmail) {
      axios
        .get(
          // get all projects that belong to the logged in user
          this.props.serverRootUrl + "/projects?userId=" + localStorage.userId
        )
        .then((response) => {
          // iterate though each of those projects, checking if the current hash matches one of the users projects hash
          response.data.forEach((project) => {
            if (project.hashId == this.state.hash) {
              console.log("match!");
              match = true;
            } else {
              return false;
            }
          });
        })
        .then(() => {
          if (match) {
            this.setState({ permission: true }, () => {
              console.log(this.state);
            });
          }
        });
    }
  };

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log("SideBar > shouldComponentUpdate");
  //   console.log("|-> props:", this.props);
  //   console.log("|-> state:", this.state);
  // };

  getProjectName = (hash) => {
    // console.log("SideBar > getProjectName");
    let { serverRootUrl } = this.props;
    let endPoint = "/projects";
    let queries = "?hashId=" + hash;

    axios.get(serverRootUrl + endPoint + queries).then((response) => {
      this.setState({ projectName: response.data[0].name });
    });
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    return (
      <NavLink to={root + endPoint} activeClassName="selected">
        <div className={"sideBarLink"}>{linkName}</div>
      </NavLink>
    );
  };

  renderAdminLinks = () => {
    if (this.state.permission) {
      return (
        <>
          {this.renderLink("user/add", "ADD USER")}
          {this.renderLink("edit", "EDIT PROJECT")}
        </>
      );
    }
  };

  render() {
    // console.log("SideBar > render");
    // console.log("|-> state:", this.state);
    let { projectName } = this.state;

    if (projectName) {
      return (
        <div className={"side-bar-container " + this.props.className}>
          <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <h3>{projectName}</h3>
            {this.renderLink("bugs", "BUG LIST")}

            {this.renderLink("bug/new", "NEW BUG")}

            {this.renderAdminLinks()}
          </Nav>
        </div>
      );
    } else {
      return (
        <div className={"side-bar-container " + this.props.className}></div>
      );
    }
  }
}

export default SideBar;
