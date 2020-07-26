import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import { GetTime } from "./shared/Helpers.jsx";

import "./css/BugList.css";
import "./css/EditBug.css";

import axios from "axios";

class BugList extends Component {
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      renderClosePopup: false,
      renderEditDescriptionPopup: false,
      status: "",
      description: "",
      closed_by: "",
      closed_at: "",
      bug: "",
      root: "null",
      redirect: false,
      closeNameValue: "",
      descriptionValue: "",
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
        closed_at: data[0].closed_at,
        description: data[0].description,
        descriptionValue: data[0].description,
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
        closed_at: "-",
      })
      .then((response) => {
        console.log(response);
        this.setState({ status: status, closed_by: "-", closed_at: "-" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleCancelClose = () => {
    this.setState({ renderClosePopup: false });
  };

  handleEditDescriptionClose = () => {
    this.setState({
      renderEditDescriptionPopup: false,
      descriptionValue: this.state.description,
    });
  };

  handleCloseSubmit = (event) => {
    // alert("Bug closed by: " + this.state.closeNameValue);
    console.log("EditBug > handleCloseSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    let bug_id = this.state.bug[0].id;
    let dateTime = GetTime();

    axios
      .patch(this.props.serverRootUrl + "/bugs/" + bug_id, {
        status: "CLOSED",
        closed_by: this.state.closeNameValue,
        closed_at: dateTime,
      })
      .then((response) => {
        console.log(response);
        this.setState({ redirect: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleEditDescription = () => {
    this.setState({ renderEditDescriptionPopup: true });
  };

  handleEditDescriptionSubmit = (event) => {
    // alert("Bug closed by: " + this.state.closeNameValue);
    console.log("EditBug > handleEditDescriptionSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    let bug_id = this.state.bug[0].id;
    // let dateTime = GetTime();

    axios
      .patch(this.props.serverRootUrl + "/bugs/" + bug_id, {
        description: this.state.descriptionValue,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          description: this.state.descriptionValue,
          renderEditDescriptionPopup: false,
        });
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

  handleCloseNameChange = (event) => {
    this.setState({ closeNameValue: event.target.value });
  };

  handleDescriptionValueChange = (event) => {
    this.setState({ descriptionValue: event.target.value });
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
                  as="textarea"
                  rows="6"
                  // placeholder="YOUR NAME HERE"
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
                onClick={this.handleCancelClose.bind(this)}
              >
                CANCEL
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  };

  renderEditDescriptionPopup = () => {
    const { renderEditDescriptionPopup } = this.state;

    if (renderEditDescriptionPopup) {
      return (
        <div className="popup-container p-4">
          <div className="popup-content p-4">
            <h1 className="text-center">EDIT BUG DESCRIPTION</h1>
            {/*  */}
            <Form onSubmit={this.handleEditDescriptionSubmit}>
              {/*  */}
              <Form.Group controlId="editDescriptionForm.ControlTextarea1">
                {/*  */}
                <Form.Control
                  as="textarea"
                  rows="6"
                  value={this.state.descriptionValue}
                  onChange={this.handleDescriptionValueChange}
                />
              </Form.Group>
              {/*  */}
              <input type="submit" value="SAVE" className="btn btn-primary" />
              <> </>
              <Button
                variant="danger"
                onClick={this.handleEditDescriptionClose.bind(this)}
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
        style = "danger uniform-status";
        break;

      case "IN PROGRESS":
        style = "warning uniform-status";
        break;

      case "CLOSED":
        style = "success uniform-status";
        break;
    }

    return this.displayCurrentStatus(status, style);
  };

  displayCurrentStatus = (status, style) => {
    return (
      <Button variant={style} className="statusButton">
        {status}
      </Button>
    );
  };

  renderDescription = () => {
    return (
      <div className="eb-description-container eb-bug-section display-1 ml-2">
        <FontAwesomeIcon icon={faBug} className="eb-image" />
        <div className="eb-description-text-container">
          <div className="eb-description-text px-4 pt-3 text-justify overflow-auto">
            {this.state.description}
          </div>
        </div>
        <div className="eb-description-button-container">
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleEditDescription.bind(this)}
          >
            EDIT DESCRIPTION
          </Button>
        </div>
      </div>
    );
  };

  renderBug = () => {
    console.log("EditBug > renderBug");
    let { bug } = this.state;
    console.log("|-> bug:", bug);

    if (bug) {
      bug = bug[0];
      console.log("|->", bug);
      return (
        <div className="eb-grid-container">
          <h6>
            <Link to={this.state.root}>BUG LIST</Link>{" "}
            {"> BUG #" + bug.idInProject}
          </h6>

          <h3>SUBJECT: {bug.subject}</h3>
          <div className="eb-grid-bug-container">
            <div className="eb-info eb-bug-section">
              <Table striped bordered className="eb-table-container">
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
                    <td>SEVERITY LEVEL</td>
                    <td>{bug.severity}</td>
                  </tr>
                  <tr>
                    <td>DATE OPENED</td>
                    <td>{bug.created_at}</td>
                  </tr>
                  <tr>
                    <td>DATE CLOSED</td>
                    <td>{this.state.closed_at}</td>
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
            {this.renderDescription()}

            {/* <div className="eb-note-entry">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>NOTE</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  ADD NOTE
                </Button>
              </Form>
            </div> */}
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
        {this.renderEditDescriptionPopup()}
      </div>
    );
  }
}

export default BugList;
