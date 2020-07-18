import React, { Component } from "react";
import SideBar from "./shared/SideBar";
import { Button } from "react-bootstrap";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  randomColor = () => {
    console.log(Math.floor(Math.random() * 16777215).toString(16));
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  render() {
    return (
      <>
        <h1 className="text-center m-3">ALL PROJECTS</h1>
        <div className="projects-grid-container p-3">
          <Button
            href="/projects/new"
            className="projects-item-container"
            variant="success"
            size="lg"
            block
          >
            <div className="projects-item">NEW PROJECT</div>
          </Button>
          <Button
            href="/projects/p/1"
            className="projects-item-container"
            variant="warning"
            size="lg"
            block
          >
            <div className="projects-item">EXISTING PROJECT</div>
          </Button>
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
