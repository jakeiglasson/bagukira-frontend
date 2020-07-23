import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  state = {
    root: null,
  };
  componentDidMount = () => {
    console.log(this.props);

    let { serverRootUrl } = this.props;
    let { hash } = this.props.match.params;
    let endPoint = "/projects";
    let queries = "?hashId=" + hash;

    this.setState({
      root: "/projects/p/" + hash + "/",
    });

    axios.get(serverRootUrl + endPoint + queries).then((response) => {
      console.log(response);
      console.log(response.data);
    });
  };

  checkLink = (route) => {
    if (route == this.props.activeLink) {
      return "selected";
    }
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    if (root) {
      return (
        <Link to={root + endPoint}>
          <div className={this.checkLink(endPoint) + " sideBarLink"}>
            {linkName}
          </div>
        </Link>
      );
    }
  };

  render() {
    console.log(this.props);
    let { serverRootUrl } = this.props;
    let { hash } = this.props.match.params;
    return (
      <div className="side-bar-container">
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
          <h3>Project Name</h3>
          {this.renderLink("bug-list", "BUG LIST")}
          {/* <Nav.Link
            href="/projects/p/1/bug-list"
            className={this.checkLink("bug-list")}
          >
            BUG LIST
          </Nav.Link> */}
          {this.renderLink("new-bug", "NEW BUG")}
          {/* <Nav.Link
            href="/projects/p/1/new-bug"
            className={this.checkLink("new-bug")}
          >
            NEW BUG
          </Nav.Link> */}
          {this.renderLink("add-user", "ADD USER")}
          {/* <Nav.Link
            href="/projects/p/1/add-user"
            className={this.checkLink("add-user")}
          >
            ADD USER
          </Nav.Link> */}
          {/* <Link to={serverRootUrl + "/projects/p/" + hash + "/edit-project"}> */}
          {/* <Link to={"/projects/p/" + hash + "/edit-project"}>
            <div className={this.checkLink("edit-project") + " sideBarLink"}>
              EDIT PROJECT
            </div>
          </Link> */}
          {this.renderLink("edit-project", "EDIT PROJECT")}
        </Nav>
      </div>
    );
  }
}

export default SideBar;
