import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Media from "react-media";
import "./css/Global.css";

class BugList extends Component {
  state = {
    bugs: [],
  };

  componentDidMount() {
    this.getTickets();
  }
        
  getTickets = () => {
    const url = `${process.env.REACT_APP_API_URL}/units/${this.props.match.params.hash}/tickets`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        this.setState({ bugs: data.tickets });
      })
      .catch((error) => {
        if (error.response.status >= 400) {
          this.props.history.push("/");
          window.location.reload(true);
        }
      });
  };

  tableHead = (conditional) => {
    if (!conditional) {
      return (
        <>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>STATUS</th>
              <th>SEVERITY</th>
              <th>OPENED</th>
              <th>CLOSED</th>
              <th>REPORTER</th>
              <th>CLOSER</th>
            </tr>
          </thead>
        </>
      );
    } else {
      return (
        <>
          <thead>
            <tr className="d-flex">
              <th className="col-4">SUBJECT</th>
              <th className="col-3">STATUS</th>
              <th className="col-3">SEVERITY</th>
              <th className="col-2">OPENED</th>
            </tr>
          </thead>
        </>
      );
    }
  };

  tableBody = (conditional) => {
    return <tbody>{this.generateBugList(conditional)}</tbody>;
  };

  returnClosedStatus = (ticket) => {
    if (ticket.closed_by) {
      return (
        <>
          {ticket.updated_at.split("T")[0].split("-")[1]}/
          {ticket.updated_at.split("T")[0].split("-")[2]}
        </>
      );
    } else {
      return " ";
    }
  };

  //   Make mobile responsive
  generateBugList = (conditional) => {
    let { bugs } = this.state;
    let collection;

    if (bugs && !conditional) {
      collection = bugs.map((bug, index) => {
        return (
          <tr key={bug.id}>
            <td>
              <Link
                data-testid={`bugId${index}`}
                to={"bugs/b/" + bug.ticket_num}
              >
                {bug.subject}
              </Link>
            </td>
            <td>{bug.status}</td>
            <td>{bug.severity}</td>
            <td>
              {bug.created_at.split("T")[0].split("-")[1]}/
              {bug.created_at.split("T")[0].split("-")[2]}
            </td>
            <td>{this.returnClosedStatus(bug)}</td>
            <td>{bug.opened_by}</td>
            <td>{bug.closed_by}</td>
          </tr>
        );
      });
    }

    if (bugs && conditional) {
      collection = bugs.map((bug, index) => {
        return (
          <tr key={bug.id} className="d-flex">
            <td className="col-4 word-wrap-anywhere">
              <Link
                data-testid={`bugId${index}`}
                to={"bugs/b/" + bug.ticket_num}
              >
                {bug.subject}
              </Link>
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

  //   Make mobile responsive
  packageComponentsForMediaQuery = (conditional) => {
    return (
      <>
        {this.tableHead(conditional)}
        {this.tableBody(conditional)}
      </>
    );
  };

  //   Make mobile responsive
  renderThroughMediaQuery = () => {
    return (
      <>
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
      </>
    );
  };

  render() {
    return (
      <div className={"side-content-container p-4 " + this.props.className}>
        <Table striped bordered hover className="bug-list-table">
          {this.renderThroughMediaQuery()}
        </Table>
      </div>
    );
  }
}

export default BugList;
