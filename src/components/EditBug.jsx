import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import "./css/BugList.css";
import "./css/EditBug.css";

import axios from "axios";

class BugList extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      renderClosePopup: false,
      status: "",
      closed_by: "",
      bug: "",
      root: "null",
      redirect: false,
      closeNameValue: "",
    };
  }

  routeConstructor = () => {
    console.log("EditBug > routeConstructor");
    let { hash, bug_id } = this.props.match.params;
    let route =
      this.props.serverRootUrl +
      "/bugs" +
      "?projectRefHash=" +
      hash +
      "&idInProject=" +
      bug_id;

    return { route, hash };
  };

  componentWillMount() {
    console.log("BugEdit > componentWillMount");
    console.log("|-> this.props.match.params:", this.props.match.params);
    this.getBug();
  }

  getBug = () => {
    console.log("EditBug > GetBug");
    // this.setState({ updateComponent: false });

    let { route, hash } = this.routeConstructor();
    console.log("|-> route:", route);

    axios.get(route).then((response) => {
      const data = response.data;
      this.setState({
        bug: data,
        status: data[0].status.toUpperCase(),
        closed_by: data[0].closed_by,
      });
      console.log("|-> state:", this.state);
    });

    this.setState({
      root: "/projects/p/" + hash + "/bugs",
    });
  };

  dropDown = () => {
    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1">SET STATUS</Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark">
          <Dropdown.Item
            eventKey="3"
            className="eb-open"
            onClick={this.handleStatusChange.bind(this, "OPEN")}
          >
            OPEN
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            className="eb-in-progress"
            onClick={this.handleStatusChange.bind(this, "IN PROGRESS")}
          >
            IN PROGRESS
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            className="eb-closed"
            onClick={this.handleStatusChange.bind(this, "CLOSED")}
          >
            CLOSED
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  handleStatusChange = (status) => {
    console.log("EditBug > handleStatusChange");
    console.log("|-> currentStatus:", this.state.currentStatus);
    console.log("|-> received status:", status);

    if (status == this.state.currentStatus) {
      console.log("theyre the same!");
    }

    if (status != this.state.currentStatus) {
      console.log("|-> STATUS CHANGE DETECTED");
      switch (status) {
        case "OPEN":
          console.log("|-> |-> clicked on open");
          this.setStatus(status);
          break;

        case "IN PROGRESS":
          console.log("|-> |-> clicked on in progress");
          this.setStatus(status);
          break;

        case "CLOSED":
          console.log("|-> |-> clicked on closed");
          this.setState({ renderClosePopup: true });
          break;
      }
    }
  };

  setStatus = (status) => {
    console.log("EditBug > setStatus");
    console.log("|-> status to set:", status);
    console.log("|-> state:", this.state);

    let currentComponent = this;

    let bug_id = this.state.bug[0].id;

    axios
      .patch(this.props.serverRootUrl + "/bugs/" + bug_id, {
        status: status,
        closed_by: "-",
      })
      .then((response) => {
        console.log(response);
        this.setState({ status: status, closed_by: "-" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // closeBug = (closerName) => {
  //   console.log("EditBug > closeBug");
  //   console.log("|-> props:", this.props);

  //   let bug_id = this.state.bug[0].id;

  //   axios
  //     .patch(this.props.serverRootUrl + "/bugs/" + bug_id, {
  //       status: "CLOSED",
  //       closed_by: closerName,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  handleCancelClose = () => {
    // console.log("executing:", "handleCancelClose");
    this.setState({ renderClosePopup: false });
  };

  displayCurrentStatus = (status, style) => {
    return (
      <Button variant={style} disabled>
        {status}
      </Button>
    );
  };

  handleCloseSubmit = (event) => {
    // alert("Bug closed by: " + this.state.closeNameValue);
    console.log("EditBug > handleCloseSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    let bug_id = this.state.bug[0].id;

    axios
      .patch(this.props.serverRootUrl + "/bugs/" + bug_id, {
        status: "CLOSED",
        closed_by: this.state.closeNameValue,
      })
      .then((response) => {
        console.log(response);
        this.setState({ redirect: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  executeRedirect = () => {
    console.log("BugEdit > executeRedirect");
    console.log("|-> state:", this.state);
    if (this.state.redirect) {
      return (
        <Redirect
          to={"/projects/p/" + this.props.match.params.hash + "/bugs"}
        />
      );
    }
  };

  // closeNameValue = () => {};

  handleCloseNameChange = (event) => {
    this.setState({ closeNameValue: event.target.value });
  };

  renderClosePopup = () => {
    const { renderClosePopup } = this.state;
    // console.log("renderClosePopup: ", renderClosePopup);
    if (renderClosePopup) {
      return (
        <div className="popup-container p-4">
          <div className="popup-content p-4">
            <h1 className="text-center">CLOSING BUG #1</h1>
            <h1 className="text-center">BUG SUBJECT TEXT GOES HERE</h1>
            <Form onSubmit={this.handleCloseSubmit}>
              <Form.Group controlId="closeBugForm.ControlTextarea1">
                <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="YOUR NAME HERE"
                  value={this.state.closeNameValue}
                  onChange={this.handleCloseNameChange}
                />
              </Form.Group>
              <input
                type="submit"
                value="CLOSE BUG"
                className="btn btn-primary"
              />
              <> </>
              <Button
                variant="danger"
                onClick={this.handleCancelClose.bind(this, "CLOSED")}
              >
                CANCEL
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  };

  status = (status) => {
    let style;
    switch (status) {
      case "OPEN":
        style = "outline-danger uniform-status";
        break;

      case "IN PROGRESS":
        style = "outline-warning uniform-status";
        break;

      case "CLOSED":
        style = "outline-success uniform-status";
        break;
    }

    return this.displayCurrentStatus(status, style);
  };

  renderBug = () => {
    console.log("EditBug > renderBug");
    let { bug } = this.state;
    console.log("|-> bug:", bug);

    if (bug) {
      bug = bug[0];
      console.log("|->", bug);
      return (
        <div>
          <h6>
            <Link to={this.state.root}>BUG LIST</Link>{" "}
            {"> BUG #" + bug.idInProject}
          </h6>

          <h3>{bug.subject}</h3>
          <div className="eb-grid-container">
            <div className="eb-info">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>BUG #{bug.idInProject}</th>
                    <th>
                      {this.status(this.state.status.toUpperCase())}{" "}
                      {this.dropDown()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DATE OPENED</td>
                    <td>{bug.created_at}</td>
                  </tr>
                  <tr>
                    <td>DATE CLOSED</td>
                    <td>{bug.closed_at}</td>
                  </tr>
                  <tr>
                    <td>REPORTED BY</td>
                    <td>{bug.reported_by}</td>
                  </tr>
                  <tr>
                    <td>CLOSED BY</td>
                    <td>{this.state.closed_by}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="eb-image display-1">
              <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
            </div>
            <div className="eb-description-entry">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>BUG DESCRIPTION</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    console.log("EditBug > render");
    return (
      <div className="side-content-container p-4">
        {this.executeRedirect()}
        {this.renderBug()}
        {this.renderClosePopup()}
      </div>
    );
  }
}

export default BugList;
