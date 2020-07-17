import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  render() {
    return (
      <div className="side-bar-container">
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
          <h3>Project Name</h3>
          <Nav.Link href="/bug-list">BUG LIST</Nav.Link>
          <Nav.Link href="/bug-list">NEW BUG</Nav.Link>
          <Nav.Link href="/bug-list">ADD USER</Nav.Link>
          <Nav.Link href="/bug-list">EDIT PROJECT</Nav.Link>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
