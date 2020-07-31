import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "../css/Global.css";
import "../css/SideBar.css";
import { Nav } from "react-bootstrap";

class SideBar extends Component {
  state = {
    root: "",
    project: {},
    userId: "",
    hash: this.props.match.params.hash,
  };

  componentDidMount = async () => {
    this.setState({
      root: "/projects/p/" + this.state.hash + "/",
    });
    this.getProject();
  };

  getProject = async () => {
    const hash = this.state.hash;
    const endPoint = "/units/" + hash;

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + endPoint
      );
      const { status, data } = response;
      if (status === 200) {
        this.setState({ project: data.units });
      }
    } catch (error) {
      alert(error);
    }
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    return (
      <NavLink
        to={root + endPoint}
        className={"sideBarLink"}
        activeClassName="selected"
      >
        {linkName}
      </NavLink>
    );
  };

  renderAdminLinks = () => {
    const userId = parseInt(localStorage.userId);

    if (userId === this.state.project.user_id) {
      return (
        <>
          {this.renderLink("user/add", "ADD USER")}
          {this.renderLink("edit", "EDIT PROJECT")}
        </>
      );
    }
  };

  render() {
    let { name } = this.state.project || { name: null };

    if (name) {
      return (
        <div className={"side-bar-container " + this.props.className}>
          <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <h3 className="word-wrap-anywhere">{name}</h3>
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
