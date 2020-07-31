import React, { Component } from "react";
import axios from "axios";
import "./css/Global.css";

class ProjectName extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    let { hash } = this.props.match.params;
    this.getProject(hash);
  };

  getProject = async (hash) => {
    const endPoint = "/units/";

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + endPoint + hash
      );
      const { status, data } = await response;
      if (status === 200) {
        this.setState({ project: data.units });
        localStorage.setItem("projectOwnerId", data.units.user_id);
        localStorage.setItem("projectName", data.units.name);
      } else {
        throw new Error("Problem retrieving project");
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { name } = this.state.project || { name: null };

    if (name) {
      return (
        <div className="responsive-project-name">
          PROJECT:
          <br />
          {localStorage.projectName}
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default ProjectName;
