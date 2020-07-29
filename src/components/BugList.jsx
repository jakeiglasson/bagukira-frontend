import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./css/Global.css";

class BugList extends Component {
  state = {
    bugs: [],
    hash: this.props.match.params.hash,
  };

  componentWillMount = () => {
    this.getTickets();
  };

  componentDidMount() {
    // console.log("componentDidMount", this.props);
  }

  getTickets = () => {
    const url = `${process.env.REACT_APP_API_URL}/units/${this.state.hash}/tickets`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log(response);
        this.setState({ bugs: data.tickets });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status >= 500) {
          alert("This resource doesn't exist");
          this.props.history.push("/");
          window.location.reload(true);
        }
      });
  };

  componentDidUpdate() {
    // console.log(this.state.bugs);
  }

  tableHead = () => {
    return (
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>SUBJECT</th>
          <th>STATUS</th>
          <th>SEVERITY</th>
          <th>DATE OPENED</th>
          <th>DATE CLOSED</th>
          {/* <th>REPORTED BY</th> */}
          {/* <th>CLOSED BY</th> */}
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
      collection = bugs.map((bug) => {
        return (
          <tr key={bug.id}>
            {/* <td>{bug.ticket_num}</td> */}
            <td>
              <Link to={"bugs/b/" + bug.ticket_num}>{bug.subject}</Link>
            </td>
            <td>{bug.status}</td>
            <td>{bug.severity}</td>
            <td>{bug.created_at}</td>
            <td>{bug.updated_at}</td>
            {/* <td>{bug.opened_by}</td> */}
            {/* <td>{bug.closed_by}</td> */}
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
        <Table striped bordered hover className="bug-list-table">
          {this.tableHead()}
          {this.tableBody()}
        </Table>
      </div>
    );
  }
}

export default BugList;
