import React, { Component } from "react";
import axios from "axios";
import SideBar from "./shared/SideBar";
import { Button } from "react-bootstrap";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  state = {
    projects: [],
  };
  componentDidMount(props) {
    console.log("componentDidMount");
    axios.get(this.props.rootUrl + "/projects").then((response) => {
      const data = response.data;
      this.setState({ projects: data });
    });
  }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  //   console.log(this.state.projects);
  // }

  randomColor = () => {
    console.log(Math.floor(Math.random() * 16777215).toString(16));
    return Math.floor(Math.random() * 16777215).toString(16);
  };

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

  existingProject = () => {
    let { projects } = this.state;
    let collection;

    if (projects) {
      collection = projects.map((project, index) => {
        return (
          <Button
            key={index}
            href={"/projects/p/" + project.hashId + "/bug-list"}
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
      });
    }

    return <>{collection}</>;
  };

  render() {
    let { projects } = this.state;
    return (
      <>
        <h1 className="text-center m-3">ALL PROJECTS</h1>
        <div className="projects-grid-container p-3">
          {this.newProject()}
          {this.existingProject()}
        </div>
      </>
      // // Old layout code, used as reference material
      // <div className="projects-grid-container p-3">
      //   <div className="new-project projects-item-container">
      //     <div className="projects-item">NEW PROJECT</div>
      //   </div>
      //   <div className="existing-project projects-item-container">
      //     <div className="projects-item">EXISTING PROJECT</div>
      //   </div>
      // </div>
    );
  }
}

export default Projects;
