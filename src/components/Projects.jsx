import React, { Component } from "react";
import SideBar from "./shared/SideBar";
import "./css/Global.css";
import "./css/Projects.css";

class Projects extends Component {
  randomColor = () => {
    console.log(Math.floor(Math.random() * 16777215).toString(16));
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  render() {
    return (
      <div className="projects-grid-container p-3">
        <div className="new-project projects-item-container">
          <div className="projects-item">NEW PROJECT</div>
        </div>
        <div className="existing-project projects-item-container">
          <div className="projects-item">EXISTING PROJECT</div>
        </div>
        <>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
          <div className="existing-project projects-item-container">
            <div className="projects-item">EXISTING PROJECT</div>
          </div>
        </>
      </div>
    );
  }
}

export default Projects;
