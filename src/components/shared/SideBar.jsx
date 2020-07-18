import React, { Component } from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  checkLink = (route) => {
    if (route == this.props.activeLink) {
      return "selected";
    }
  };
  render() {
    console.log(this.props);
    return (
      <div className="side-bar-container">
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
          <h3>Project Name</h3>
          <Nav.Link
            href="/projects/p/1/bug-list"
            className={this.checkLink("bug-list")}
          >
            BUG LIST
          </Nav.Link>
          <Nav.Link
            href="/projects/p/1/new-bug"
            className={this.checkLink("new-bug")}
          >
            NEW BUG
          </Nav.Link>
          <Nav.Link
            href="/projects/p/1/add-user"
            className={this.checkLink("add-user")}
          >
            ADD USER
          </Nav.Link>
          <Nav.Link
            href="/projects/p/1/edit-project"
            className={this.checkLink("edit-project")}
          >
            EDIT PROJECT
          </Nav.Link>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
