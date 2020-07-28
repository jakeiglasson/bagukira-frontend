import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";

// import { checkForCorrectLoggedInUser } from "./Helpers.jsx";

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

    if (localStorage.userId) {
      console.log("id detected");
      this.setState({ permission: true });
    }
    console.log(this.props.match.params);
    let { hash } = this.props.match.params;
    this.setState({ root: "/projects/p/" + hash + "/" });
    this.getProject(hash);

    let component = this;
    let setPermission = true;
    let redirect = false;

    console.log(localStorage);

    // checkForCorrectLoggedInUser(component, setPermission, redirect);
  };

  componentWillUpdate = () => {
    console.log("componentWillUpdate");
    console.log(this.state);
  };

  // checkForCorrectLoggedInUser = () => {
  //   let match = false;
  //   console.log(localStorage);
  //   if (localStorage.userId === this.state.project.user_id) {
  //     this.setState({ permission: true }), console.log(this.state);
  //   }
  // };
  // axios
  //   .get(
  //     // get all projects that belong to the logged in user
  //     process.env.REACT_APP_API_URL +
  //       "/projects?userId=" +
  //       localStorage.userId
  //   )
  //   .then((response) => {
  // iterate though each of those projects, checking if the current hash matches one of the users projects hash
  //   response.data.forEach((project) => {
  //     if (project.hashId == this.state.hash) {
  //       console.log("match!");
  //       match = true;
  //     } else {
  //       return false;
  //     }
  //   });
  // })
  // .then(() => {
  //   if (match) {

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log("SideBar > shouldComponentUpdate");
  //   console.log("|-> props:", this.props);
  //   console.log("|-> state:", this.state);
  // };

  getProject = async (hash) => {
    // console.log("SideBar > getProject");
    const endPoint = "/units/";
    await axios
      .get(process.env.REACT_APP_API_URL + endPoint + hash)
      .then((response) => {
        console.log(response.data);
        this.setState({ project: response.data.units });
        localStorage.setItem("projectOwnerId", response.data.units.user_id);
      })
      .catch((error) => {
        console.log(error);
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
    if (localStorage.userId == this.state.project.user_id) {
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
    let { name } = this.state.project || { name: null };

    if (name) {
      return (
        <div className={"side-bar-container " + this.props.className}>
          <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <h3>{name}</h3>
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
