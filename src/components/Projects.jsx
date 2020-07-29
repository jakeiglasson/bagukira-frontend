import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    console.log("Projects > constructor");
    console.log("|-> props:", this.props);
    this.state = {
      projects: [],
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
  }

  async componentWillMount() {
    console.log("componentDidMount");
    console.log("localStorage:", localStorage);
    console.log(this.props);

    if (this.props.unAuthorized == false) {
      alert("You are not authorized to access this resource");
      this.props.history.push("/");
      window.location.reload(true);
    }

    await axios
      .get(
        process.env.REACT_APP_API_URL +
          "/users/" +
          this.state.userId +
          "/units",
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({ projects: data.units });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // randomColor = () => {
  //   console.log(Math.floor(Math.random() * 16777215).toString(16));
  //   return Math.floor(Math.random() * 16777215).toString(16);
  // };

  newProject = () => {
    return (
      <Button
        href="/projects/new"
        className="projects-item-container"
        variant="success"
        size="lg"
        block
      >
        <div className="projects-item">NEW PROJECT</div>
      </Button>
    );
  };

  existingProjects = () => {
    const { projects } = this.state;
    return (
      <>
        {projects &&
          projects.map((project, index) => {
            return (
              <Button
                key={index}
                href={"/projects/p/" + project.id + "/bugs"}
                className="projects-item-container"
                variant="warning"
                size="lg"
                block
              >
                <div className="projects-item">{project.name}</div>
                <div className="projects-item">
                  Belongs To User ID: {project.userId}
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
