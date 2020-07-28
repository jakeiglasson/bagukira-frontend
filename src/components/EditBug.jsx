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
  state = {
    renderClosePopup: false,
    renderEditDescriptionPopup: false,
    ticket: {},
    root: `/projects/p/${this.props.match.params.hash}/bugs`,
    statusList: {
      OPEN: ["danger uniform-status", "eb-open"],
      "IN PROGRESS": ["warning uniform-status", "eb-in-progress"],
      CLOSED: ["success uniform-status", "eb-closed"],
    },
    url: `${process.env.REACT_APP_API_URL}/units/${this.props.match.params.hash}/tickets/${this.props.match.params.bug_id}`,
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(this.state.url);
      const { data = {}, error } = response;

      if (typeof error !== undefined) {
        this.setState({ ticket: data.tickets });
        return;
      } else {
        throw error;
      }
    } catch (error) {
      alert(error, "Sorry something went wrong :(");
      return error;
    }
  };

  componentWillUnmount = () => {
    if (this.response) {
      this.response.cancel();
    }
    // window.location.reload(true);
  };

  changePage = () => {
    this.props.history.push(`${this.state.root}bugs/b/${this.state.ticket.id}`);
  };

  updateBug = async () => {
    const data = JSON.stringify(this.state.ticket);
    console.log(data);

    await axios
      .patch(this.state.url, {
        ticket: data,
      })
      .then((response) => {
        console.log(response);
        this.changePage();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onInputChange = (event) => {
    const setStatus = (status) =>
      this.setState({
        ticket: { status: status },
      });

    switch (event.target.id) {
      case "OPEN":
      case "IN PROGRESS":
        setStatus(event.target.id);
        break;
      case "CLOSED":
        setStatus(event.target.id);
        this.setState({
          renderClosePopup: true,
        });
        break;
      default:
        inputEventState(this, event);
        return;
    }

    console.log(event.target.id);
    console.log(this.state.ticket);
  };

  handleClose = () => {
    this.setState({
      renderClosePopup: false,
      renderEditDescriptionPopup: false,
    });
  };

  dropDown = () => {
    let { status } = { status: "open" } || this.state.ticket;
    const { statusList } = this.state;
    status = status.toUpperCase();

    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1">SET STATUS</Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark">
          <Button variant={statusList[status][0]} className="statusButton">
            {status}
          </Button>
          {Object.keys(statusList).map((key, index) => {
            return (
              <Dropdown.Item
                key={index}
                id={key}
                eventKey={index}
                className={statusList[key][1]}
                onClick={this.onInputChange}
              >
                {key}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  renderClosePopup = () => {
    const { renderClosePopup } = this.state;

    return (
      <>
        {renderClosePopup && (
          <div className="popup-container p-4">
            <div className=" p-4">
              <h1 className="text-center">CLOSING BUG</h1>
              {/* <h1 className="text-center">BUG SUBJECT TEXT GOES HERE</h1> */}
              <Form onSubmit={this.updateBug}>
                <Form.Group controlId="closeBugForm.ControlTextarea1">
                  <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                  <Form.Control
                    type="text"
                    // rows="6"
                    placeholder="YOUR NAME HERE"
                    value={this.state.ticket.closed_by}
                    onChange={this.onInputChange}
                  />
                </Form.Group>
                <input
                  type="submit"
                  value="CLOSE BUG"
                  className="btn btn-primary"
                />
                <> </>
                <Button variant="danger" onClick={this.handleClose}>
                  CANCEL
                </Button>
              </Form>
            </div>
          </div>
        )}
      </>
    );
  };

  renderEditDescriptionPopup = () => {
    const { renderEditDescriptionPopup } = this.state;

    return (
      <>
        {renderEditDescriptionPopup && (
          <div className="popup-container p-4">
            <div className="popup-content p-4">
              <h1 className="text-center">EDIT BUG DESCRIPTION</h1>
              <Form onSubmit={this.updateBug} className="eb-description-width">
                <Form.Group controlId="editDescriptionForm.ControlTextarea1">
                  <Form.Control
                    id="description"
                    as="textarea"
                    rows="6"
                    value={this.state.ticket.description}
                    onChange={this.onInputChange}
                    className="px-4 eb-edit-description-text"
                  />
                  <Button
                    id="save"
                    type="submit"
                    value="SAVE"
                    className="btn btn-primary"
                  />
                  <Button
                    id="editDescriptionClose"
                    variant="danger"
                    onClick={this.handleClose}
                  >
                    CANCEL
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        )}
      </>
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

  renderBug = (ticket) => {
    return (
      <div className="eb-grid-container">
        <h6>
          <Link to={this.state.root}>BUG LIST</Link>{" "}
          {"> BUG #" + ticket.ticket_num}
        </h6>
        <h3>SUBJECT: {ticket.subject}</h3>
        <div className="eb-grid-bug-container">
          <div className="eb-info eb-bug-section">
            <Table striped bordered className="eb-table-container">
              <thead>
                <tr>
                  <th>BUG #{ticket.ticket_num}</th>
                  <th>{this.dropDown()}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SEVERITY LEVEL</td>
                  <td>{ticket.severity}</td>
                </tr>
                <tr>
                  <td>DATE OPENED</td>
                  <td>{ticket.created_at}</td>
                </tr>
                <tr>
                  <td>DATE CLOSED</td>
                  <td>{ticket.closed_at}</td>
                </tr>
                <tr>
                  <td>REPORTED BY</td>
                  <td>{ticket.opened_by}</td>
                </tr>
                <tr>
                  <td>CLOSED BY</td>
                  <td>{ticket.closed_by}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          {this.renderDescription()}
        </div>
      </div>
    );
  };

  render() {
    const { ticket } = this.state;

    return (
      <div className="side-content-container p-4">
        {/* {this.executeRedirect()} */}
        {ticket === {} || this.renderBug(ticket)}
        {this.renderClosePopup()}
        {this.renderEditDescriptionPopup()}
      </div>
    );
  }
}

export default EditBug;
