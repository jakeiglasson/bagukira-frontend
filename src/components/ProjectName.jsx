import React, { Component } from "react";
import axios from "axios";
import "./css/Global.css";

class ProjectName extends Component {
  state = {
    loading: true,
  };

  componentWillMount = () => {
    let { hash } = this.props.match.params;

    this.getProject(hash);
  };

  getProject = async (hash) => {
    // console.log("SideBar > getProject");
    const endPoint = "/units/";
    await axios
      .get(process.env.REACT_APP_API_URL + endPoint + hash)
      .then((response) => {
        // console.log(response.data);
        this.setState({ project: response.data.units });
        localStorage.setItem("projectOwnerId", response.data.units.user_id);
        localStorage.setItem("projectName", response.data.units.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.props);
    console.log(localStorage);

    let { name } = this.state.project || { name: null };

    if (name) {
      return (
        <div className="responsive-project-name">
          PROJECT:
          <br />
          {localStorage.projectName}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProjectName;
