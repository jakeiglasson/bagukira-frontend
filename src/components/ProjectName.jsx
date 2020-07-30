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

      if (response.status === 200) {
        this.setState({ project: response.data.units });
        localStorage.setItem("projectOwnerId", response.data.units.user_id);
        localStorage.setItem("projectName", response.data.units.name);
      } else {
        throw new Error("");
      }
    } catch (error) {
      alert(`Error: ${error}`);
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
