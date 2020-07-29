import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Media, { useMedia } from "react-media";
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

  tableHead = (conditional) => {
    if (!conditional) {
      return (
        <thead>
          <tr>
            {/* <th>#</th> */}
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
    } else {
      return (
        <thead>
          <tr className="d-flex">
            {/* <th>#</th> */}
            <th className="col-4">SUBJECT</th>
            <th className="col-3">STATUS</th>
            <th className="col-3">SEVERITY</th>
            <th className="col-2 small-th-text">DATE OPENED</th>
          </tr>
        </thead>
      );
    }
  };

  tableBody = (conditional) => {
    return <tbody>{this.generateBugList(conditional)}</tbody>;
  };

  generateBugList = (conditional) => {
    let { bugs } = this.state;
    let collection;

    if (bugs && !conditional) {
      collection = bugs.map((bug) => {
        return (
          <tr key={bug.id}>
            {/* <td>{bug.ticket_num}</td> */}
            <td>
              <Link to={"bugs/b/" + bug.ticket_num}>{bug.subject}</Link>
            </td>
            <td>{bug.status}</td>
            <td>{bug.severity}</td>
            <td>{bug.created_at.split("T")[0]}</td>
            <td>{bug.updated_at.split("T")[0]}</td>
            <td>{bug.opened_by}</td>
            <td>{bug.closed_by}</td>
          </tr>
        );
      });
    }

    if (bugs && conditional) {
      collection = bugs.map((bug) => {
        return (
          <tr key={bug.id} className="d-flex">
            {/* <td>{bug.ticket_num}</td> */}
            <td className="col-4 word-wrap-anywhere">
              <Link to={"bugs/b/" + bug.ticket_num}>{bug.subject}</Link>
            </td>
            <td className="col-3">{bug.status}</td>
            <td className="col-3">{bug.severity}</td>
            <td className="col-2">
              {bug.created_at.split("T")[0].split("-")[1]}/
              {bug.created_at.split("T")[0].split("-")[2]}
            </td>
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

  packageComponentsForMediaQuery = (conditional) => {
    return (
      <>
        {this.tableHead(conditional)}
        {this.tableBody(conditional)}
      </>
    );
  };

  renderThroughMediaQuery = () => {
    return (
      <div>
        <Media
          queries={{
            desktop: "(min-width: 1025px)",
            tablet: "(min-width: 481px) and (max-width: 1024px)",
            mobile: "(min-width: 320px) and (max-width: 480px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.desktop && this.packageComponentsForMediaQuery(false)}
              {matches.tablet && this.packageComponentsForMediaQuery(true)}
              {matches.mobile && this.packageComponentsForMediaQuery(true)}
            </Fragment>
          )}
        </Media>
      </div>
    );
  };

  render() {
    return (
      <div className={"side-content-container p-4 " + this.props.className}>
        <Table
          striped
          bordered
          hover
          className="bug-list-table"
          // responsive="sm"
        >
          {this.renderThroughMediaQuery()}
          {/* {this.tableHead()}
          {this.tableBody(false)} */}
        </Table>
      </div>
    );
  }
}

export default BugList;
