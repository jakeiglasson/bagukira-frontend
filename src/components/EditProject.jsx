import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { inputEventState } from "./shared/Helpers.jsx";

import "./css/NewBug.css";
import "./css/EditProject.css";
import "./css/Global.css";

class EditProject extends Component {
  state = {
    projectName: "",
    projectId: "",
    redirect: false,
    render: false,
    hash: this.props.match.params.hash,
  };

  componentDidMount = () => {
    // if (!localStorage.userId) {
    //   this.props.history.push("/");
    // }

    this.setState({ projectName: localStorage.projectName });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateProjectName()) {
      this.updateProjectName();
    }
  };

  validateProjectName = () => {
    const letters = /^[0-9a-zA-Z]+$/;
    const projectName = this.state.projectName.replace(/\s+/g, ""); // remove spaces for regex check
    if (projectName.match(letters)) {
      // alert("Project name has been updated");
      return true;
    } else {
      alert("Invalid project name, project names may only be alphanumeric");
      return false;
    }
  };

  // logic to send project name to backend
  updateProjectName = async () => {
    const projectName = this.state.projectName;
    const hash = this.state.hash;
    const url = `${process.env.REACT_APP_API_URL}/units/${hash}`;
    const token = localStorage.getItem("token");

    if (projectName.length > 40) {
      alert("Project name is too long, 40 character limit");
      return;
    }

    const data = {
      unit: {
        name: projectName.toUpperCase(),
      },
    };

    const config = {
      method: "patch",
      url: url,
      data: data,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios(config);

      const { status } = await response;
      if (status === 204) {
        this.props.history.push(`/projects/p/${hash}/bugs`);
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  onInputChange = (event) => inputEventState(this, event);

  renderEditProjectForm = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>PROJECT NAME</Form.Label>
          <Form.Control
            id="projectName"
            type="text"
            placeholder="PROJECT NAME"
            value={this.state.projectName.toUpperCase()}
            onChange={this.onInputChange}
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

  renderContent = () => {
    if (localStorage.userId === localStorage.projectOwnerId) {
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
      <div className="side-content-container p-4">{this.renderContent()}</div>
    );
  }
}

export default EditProject;
