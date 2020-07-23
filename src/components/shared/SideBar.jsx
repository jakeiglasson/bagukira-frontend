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
    let root = "/projects/p/" + hash + "/";

    // check to see if root has changed, if so get new data
    if (this.state.root != root) {
      this.setState({
        root: "/projects/p/" + hash + "/",
      });

      axios.get(serverRootUrl + endPoint + queries).then((response) => {
        this.setState({ projectName: response.data[0].name });
      });
    }
  };

  checkLinkIsActive = (route) => {
    if (route == this.props.activeLink) {
      return "selected";
    }
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    if (root) {
      return (
        <Link to={root + endPoint}>
          <div className={this.checkLinkIsActive(endPoint) + " sideBarLink"}>
            {linkName}
          </div>
        </Link>
      );
    }
  };

  // projectName = this.state.projectName;

  render() {
    let { projectName } = this.state;
    if (projectName) {
      return (
        <div className={"side-bar-container " + this.props.className}>
          <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <h3>{projectName}</h3>
            {this.renderLink("bugs", "BUG LIST")}

            {this.renderLink("bugs/new", "NEW BUG")}

            {this.renderLink("user/add", "ADD USER")}

            {this.renderLink("edit", "EDIT PROJECT")}
          </Nav>
        </div>
      );
    } else {
      // return null;
      return (
        <div className={"side-bar-container " + this.props.className}>
          <h1>LOADING</h1>
        </div>
      );
    }
  }
}

export default SideBar;
