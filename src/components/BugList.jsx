import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/Global.css";

class BugList extends Component {
  state = {
    bugs: [],
  };

  componentDidMount() {
    console.log("componentDidMount", this.props);
    let { hash } = this.props.match.params;
    let route = this.props.serverRootUrl + "/bugs?projectRefHash=" + hash;

    axios.get(route).then((response) => {
      const data = response.data;
      this.setState({ bugs: data });
    });
  }

  componentDidUpdate() {
    console.log(this.state.bugs);
  }

  tableHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th>SUBJECT</th>
          <th>STATUS</th>
          <th>SEVERITY</th>
          <th>DATE OPENED</th>
          <th>DATE CLOSED</th>
          <th>REPORTED BY</th>
          <th>CLOSED BY</th>
        </tr>
      </thead>
    );
  };

  tableBody = () => {
    return <tbody>{this.generateBugList()}</tbody>;
  };

  generateBugList = () => {
    let { bugs } = this.state;
    let collection;

    if (bugs) {
      collection = bugs.map((bug, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>

            <td>
              <Link to={"bugs/b/" + bug.idInProject}>{bug.subject}</Link>
            </td>
            <td>{bug.status}</td>
            <td>{bug.severity}</td>
            <td>{bug.created_at}</td>
            <td>{bug.closed_at}</td>
            <td>{bug.reported_by}</td>
            <td>{bug.closed_by}</td>
          </tr>
        );
      });
    }

    return <>{collection}</>;
  };

  // generateBugList = () => {
  //   let { bugs } = this.state;
  //   console.log("bug array:", bugs);
  //   let collection;

  //   if (bugs) {
  //     bugs.map((bug, index) => {
  //       return (
  // <tr>
  //   <td>{index}</td>

  //   <td>
  //     <Link to={"./bug-list/" + index}>
  //       Sidebar displaying on all pages
  //     </Link>
  //   </td>
  //   <td>OPEN</td>
  //   <td>LOW</td>
  //   <td>1/1/2020</td>
  //   <td>-</td>
  //   <td>JAKE GLASSON</td>
  //   <td>-</td>
  // </tr>
  //       );
  //     });
  //   }
  // };

  render() {
    return (
      <div className={"side-content-container p-4 " + this.props.className}>
        <Table striped bordered hover>
          {this.tableHead()}
          {this.tableBody()}
        </Table>
      </div>
    );
  }
}

export default BugList;
