import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { checkForCorrectLoggedInUser } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/Global.css";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      projectId: "",
      redirect: false,
      render: false,
      hash: this.props.match.params.hash,
    };
    console.log(this.props);
  }

  componentWillMount = () => {
    this.getProjectInfo();

    let component = this;
    let setPermission = false;
    let redirect = true;
    checkForCorrectLoggedInUser(component, setPermission, redirect);
  };

  getProjectInfo = () => {
    // console.log("SideBar > getProjectName");
    let hash = this.props.match.params.hash;
    let { serverRootUrl } = this.props;
    let endPoint = "/projects";
    let queries = "?hashId=" + hash;

    axios.get(serverRootUrl + endPoint + queries).then((response) => {
      console.log(response);
      this.setState({
        projectName: response.data[0].name,
        projectId: response.data[0].id,
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    if (this.validateProjectName()) {
      this.updateProjectName();
    }
  };

  validateProjectName = () => {
    var letters = /^[0-9a-zA-Z]+$/;
    let projectName = this.state.projectName.replace(/\s+/g, ""); // remove spaces for regex check
    if (projectName.match(letters)) {
      alert("Project name has been updated");
      return true;
    } else {
      alert("Invalid project name, project names may only be alphanumeric");
      return false;
    }
  };

  updateProjectName = (projectName) => {
    // logic to send project name to backend
    axios
      .patch(this.props.serverRootUrl + "/projects/" + this.state.projectId, {
        name: this.state.projectName,
      })
      .then((response) => {
        console.log(response);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({ projectName: event.target.value });
  };

  renderEditProjectForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="addUserForm.ControlTextarea1">
          <Form.Label>PROJECT NAME</Form.Label>
          <Form.Control
            type="text"
            placeholder="PROJECT NAME"
            value={this.state.projectName}
            onChange={(event) => {
              this.handleChange(event);
            }}
          />
        </Form.Group>

        <input
          type="submit"
          value="SUBMIT"
          className="btn btn-block btn-primary"
        />
      </Form>
    );
  };

  handleRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={"/projects/p/" + this.props.match.params.hash + "/bugs"}
        />
      );
    }
  };

  renderContent = () => {
    if (this.state.render) {
      return (
        <div className="p-4 global-form-container">
          <h2 className="text-center">EDIT PROJECT</h2>
          {this.renderEditProjectForm()}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="side-content-container p-4">
        {this.handleRedirect()}
        {this.renderContent()}
      </div>
    );
  }
}

export default EditProject;
