import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import "./css/BugList.css";
import "./css/EditBug.css";

import axios from "axios";

class EditBug extends Component {
  state = {
    renderClosePopup: false,
    renderEditDescription: false,
    ticket: { status: "open" },
    previousStatus: "open",
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
    this.props.history.push(`${this.state.root}`);
  };

  updateBug = async () => {
    await axios
      .patch(this.state.url, {
        ticket: this.state.ticket,
      })
      .then((response) => {
        console.log(response);
        const descriptionChanged = this.state.renderEditDescription;
        this.setState({
          renderClosePopup: false,
          renderEditDescription: false,
        });

        if (this.state.ticket.status === "CLOSED" || descriptionChanged) {
          this.changePage();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   Handle user interface inputs for bug ticket
  onInputChange = (event) => {
    switch (event.target.id) {
      // Handle changes of bug status
      case "OPEN":
      case "IN PROGRESS":
        this.setTicketState("status", event.target.id);
        // Update and changes to the bug from ticket state
        this.updateBug();
        break;

      case "CLOSED":
        this.setState({
          previousStatus: this.state.ticket.status,
          previousClosedBy: this.state.tickets.closed_by,
          renderClosePopup: true,
        });
        this.setTicketState("status", event.target.id);
        this.setTicketState("closed_by", "");
        break;

      default:
        //  Handle all other field changes
        this.setTicketState(event.target.id, event.target.value);
        return;
    }
  };

  // Handle ticket status changes and rollbacks
  setTicketState = (key, value) => {
    const ticket = this.state.ticket;
    ticket[key] = value;
    // Set changes to ticket status in state
    this.setState({
      ticket: ticket,
    });
  };

  //   Render the description edit modal
  showEditDescription = () => {
    this.setState({
      renderEditDescription: true,
    });
  };

  //   Close the description or close function modals
  handleCloseModal = () => {
    // Rollback status
    this.setTicketState("status", this.state.previousStatus);
    this.setTicketState("closed_by", this.state.previousClosedBy);
    // Hide modals
    this.setState({
      renderClosePopup: false,
      renderEditDescription: false,
    });
  };

  dropDown = () => {
    let { status } = this.state.ticket;
    const { statusList } = this.state;
    status = status.toUpperCase();

    return (
      <>
        <Button variant={statusList[status][0]} className="statusButton">
          {status}
        </Button>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle id="dropdown-custom-1 text-centered">
            SET STATUS
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-dark">
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
      </>
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
              <h1 className="text-center">{this.state.ticket.subject}</h1>
              <Form onSubmit={this.updateBug}>
                <Form.Group controlId="closeBugForm.ControlTextarea1">
                  <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                  <Form.Control
                    id="closed_by"
                    type="text"
                    placeholder="YOUR NAME HERE"
                    value={this.state.ticket.closed_by}
                    onChange={this.onInputChange}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  value="CLOSE BUG"
                  className="btn btn-primary"
                >
                  CLOSE BUG
                </Button>
                <> </>
                <Button variant="danger" onClick={this.handleCloseModal}>
                  CANCEL
                </Button>
              </Form>
            </div>
          </div>
        )}
      </>
    );
  };

  renderEditDescription = () => {
    const { renderEditDescription } = this.state;

    return (
      <>
        {renderEditDescription && (
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
                    variant="primary"
                    className="btn btn-primary"
                  >
                    SAVE
                  </Button>
                  <div className="x-spacer" />
                  <Button
                    id="editDescriptionClose"
                    variant="danger"
                    className="btn mt-2"
                    onClick={this.handleCloseModal}
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
            onClick={this.showEditDescription}
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
        {ticket === {} || this.renderBug(ticket)}
        {this.renderClosePopup()}
        {this.renderEditDescription()}
      </div>
    );
  }
}

export default EditBug;
