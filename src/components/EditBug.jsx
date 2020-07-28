import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import { inputEventState } from "./shared/Helpers.jsx";

import "./css/BugList.css";
import "./css/EditBug.css";

import axios from "axios";

class EditBug extends Component {
  constructor(props) {
    super(props);
    const { hash, bug_id } = this.props.match.params;
    this.state = {
      renderClosePopup: false,
      renderEditDescriptionPopup: false,
      ticket: {
        id: "",
        status: "",
        description: "",
        closed_by: "",
        closed_at: "",
      },
      root: `/projects/p/${this.props.match.params.hash}/bugs`,
      redirect: false,
      closeNameValue: "",
      descriptionValue: "",
    };
  }

  componentWillMount = () => {
    console.log("BugEdit > componentWillMount");
    console.log("|-> this.props.match.params:", this.props.match.params);
    this.getBug();
  };

  getBug = async () => {
    console.log("EditBug > GetBug");
    // this.setState({ updateComponent: false });
    const url = `${process.env.REACT_APP_API_URL}/units/${this.state.hash}/tickets/${this.state.ticket.id}`;

    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
      })
      .then((data) => {
        this.setState({
          bug: data,
        });
      })
      .catch((error) => console.log(error));
  };

  handleStatusChange = (status) => {
    console.log("EditBug > handleStatusChange");
    console.log("|-> currentStatus:", this.state.currentStatus);
    console.log("|-> received status:", status);

    if (status == this.state.currentStatus) {
      console.log("they're the same!");
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

  updateBug = () => {
    console.log(this.state.ticket);
    axios
      .patch(this.props.serverRootUrl + "/bugs/" + this.state.ticket, {
        ticket: this.state.ticket,
      })
      .then((response) => {
        console.log(response);
        // this.setState({ status: status, closed_by: "", closed_at: "" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onInputChange = (event) => inputEventState(this, event);

  handleCancelClose = () => {
    this.setState({ renderClosePopup: false });
  };

  handleEditDescriptionClose = () => {
    this.setState({
      renderEditDescriptionPopup: false,
      descriptionValue: this.state.description,
    });
  };

  handleEditDescriptionSubmit = (event) => {
    // alert("Bug closed by: " + this.state.closeNameValue);
    console.log("EditBug > handleEditDescriptionSubmit");
    console.log("|-> state:", this.state);
    event.preventDefault();

    let bug_id = this.state.bug[0].id;

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

  renderClosePopup = () => {
    const { renderClosePopup } = this.state;
    // console.log("renderClosePopup: ", renderClosePopup);
    if (renderClosePopup) {
      return (
        <div className="popup-container p-4">
          <div className=" p-4">
            <h1 className="text-center">CLOSING BUG</h1>
            {/* <h1 className="text-center">BUG SUBJECT TEXT GOES HERE</h1> */}
            <Form onSubmit={this.handleCloseSubmit}>
              <Form.Group controlId="closeBugForm.ControlTextarea1">
                <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                <Form.Control
                  type="text"
                  // rows="6"
                  placeholder="YOUR NAME HERE"
                  value={this.state.closeNameValue}
                  onChange={this.onInputChange}
                />
              </Form.Group>
              <input
                type="submit"
                value="CLOSE BUG"
                className="btn btn-primary"
              />
              <> </>
              <Button variant="danger" onClick={this.handleCancelClose}>
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
            <Form
              onSubmit={this.onInputChange}
              className="eb-description-width"
            >
              {/*  */}
              <Form.Group controlId="editDescriptionForm.ControlTextarea1">
                {/*  */}
                <Form.Control
                  as="textarea"
                  rows="6"
                  value={this.state.descriptionValue}
                  onChange={this.onInputChange}
                  className="px-4 eb-edit-description-text"
                />
              </Form.Group>
              {/*  */}
              <input type="submit" value="SAVE" className="btn btn-primary" />
              <> </>
              <Button
                id="editDescriptionClose"
                variant="danger"
                onClick={this.handleClose}
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
          <div className="eb-description-text px-4 pt-3 overflow-auto eb-description-width">
            {this.state.ticket.description}
          </div>
        </div>
        <div className="eb-description-button-container">
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleEditDescription}
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
      return (
        <div className="eb-grid-container">
          <h6>
            <Link to={this.state.root}>BUG LIST</Link>{" "}
            {"> BUG #" + bug.ticket_num}
          </h6>

          <h3>SUBJECT: {bug.subject}</h3>
          <div className="eb-grid-bug-container">
            <div className="eb-info eb-bug-section">
              <Table striped bordered className="eb-table-container">
                <thead>
                  <tr>
                    <th>BUG #{bug.ticket_num}</th>
                    <th>
                      {this.status(this.state.status.toUpperCase())}{" "}
                      {this.dropDown()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SEVERITY LEVEL</td>
                    <td>{bug.severity.toUpperCase()}</td>
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
                    <td>{bug.opened_by}</td>
                  </tr>
                  <tr>
                    <td>CLOSED BY</td>
                    <td>{this.state.closed_by}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {this.renderDescription()}
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

export default EditBug;
