import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  state = {
    projects: [],
  };

  componentDidMount = async () => {
    // if (this.props.authorized === false) {
    //   this.props.history.push("/");
    // }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/users/" + userId + "/units",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, status } = response;
      if (status === 200) {
        this.setState({ projects: data.units });
      } else {
        throw new Error(`Access error: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  newProject = () => {
    return (
      <Button
        href="/projects/new"
        data-testid={`NEW PROJECT`}
        className="projects-item-container"
        variant="success"
        size="lg"
        block
      >
        <div className="projects-item">NEW PROJECT</div>
      </Button>
    );
  };

  storeHash(hash) {
    localStorage.setItem("hash", hash);
  }

  existingProjects = () => {
    const { projects } = this.state;

    console.log(projects);
    return (
      <>
        {projects &&
          projects.map((project, index) => {
            return (
              <Button
                key={index}
                data-testid={`EXISTING PROJECT${index}`}
                href={"/projects/p/" + project.id + "/bugs"}
                className="projects-item-container"
                variant="warning"
                size="lg"
                block
                onClick={this.storeHash(project.id)}
              >
                <div className="projects-item word-wrap-anywhere">
                  {project.name}
                </div>
              </Button>
            );
          })}
      </>
    );
  };

  render() {
    return (
      <>
        <h1 className="text-center m-3">ALL PROJECTS</h1>
        <div className="projects-grid-container p-3">
          {this.newProject()}
          {this.existingProjects()}
        </div>
      </>
    );
  }
}

export default Projects;
