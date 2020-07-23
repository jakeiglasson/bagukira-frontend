import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import "../css/Global.css";
import "../css/SideBar.css";
import { Button, Nav } from "react-bootstrap";

class SideBar extends Component {
  constructor(props) {
    super(props);
    // console.log("SideBar > constructor");
    // console.log("|-> props:", this.props);
    this.state = {
      root: "",
      projectName: "",
    };
    // console.log("|-> state:", this.state);
  }
  componentWillMount = () => {
    // console.log("SideBar > componentWillMount");
    let { hash } = this.props.match.params;
    this.setState({ root: "/projects/p/" + hash + "/" });
    // let root = "/projects/p/" + hash + "/";
    this.getProjectName(hash);
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

    // check to see if root has changed, if so get new data. Probably redundant, needs to be tested for removal.
    // if (this.state.root != root) {
    //   this.setState({
    //     root: "/projects/p/" + hash + "/",
    //   });

    axios.get(serverRootUrl + endPoint + queries).then((response) => {
      this.setState({ projectName: response.data[0].name });
    });
    // }
  };

  checkLinkIsActive = (route) => {
    if (route == this.props.activeLink) {
      return "selected";
    }
  };

  renderLink = (endPoint, linkName) => {
    let { root } = this.state;
    return (
      <Link to={root + endPoint}>
        <div className={this.checkLinkIsActive(endPoint) + " sideBarLink"}>
          {linkName}
        </div>
      </Link>
    );
  };

  // projectName = this.state.projectName;

  render() {
    // console.log("SideBar > render");
    // console.log("|-> state:", this.state);
    let { projectName } = this.state;

    // return (
    //   <div className={"side-bar-container " + this.props.className}>
    //     <Nav defaultActiveKey="/home" className="flex-column sidebar">
    //       <h3>projectName</h3>
    //       {this.renderLink("bugs", "BUG LIST")}

    //       {this.renderLink("bugs/new", "NEW BUG")}

    //       {this.renderLink("user/add", "ADD USER")}

    //       {this.renderLink("edit", "EDIT PROJECT")}
    //     </Nav>
    //   </div>
    // );

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
        <div className={"side-bar-container " + this.props.className}></div>
      );
    }
  }
}

export default SideBar;
