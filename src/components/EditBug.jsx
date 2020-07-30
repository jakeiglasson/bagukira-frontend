import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import Media from "react-media";
import _ from "lodash";
import "./css/BugList.css";
import "./css/EditBug.css";
import axios from "axios";

class EditBug extends Component {
  state = {
    renderClosePopup: false,
    renderEditDescription: false,
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

      if (typeof data !== undefined) {
        this.setState({
          ticket: data.tickets,
          prevTicket: _.cloneDeep(data.tickets),
        });
        return;
      } else {
        throw error;
      }
    } catch (error) {
      alert(error, `Sorry something went wrong :(\n${error}`);
    }
  };

  //   Future handling of leaving page before response received
  //   componentWillUnmount = () => {
  //     if (this.response) {
  //       this.response.cancel();
  //     }
  //   };

  changePage = () => {
    this.props.history.push(`${this.state.root}`);
  };

  updateBug = async () => {
    if (this.state.ticket.closed_by.length > 30) {
      alert("Name is too long (30 character limit)");
      return;
    }

    if (this.state.prevTicket === this.state.ticket) {
      return;
    }

    try {
      const response = await axios.patch(this.state.url, {
        ticket: this.state.ticket,
      });
      if (response.status === 201) {
        this.setState({
          renderClosePopup: false,
          renderEditDescription: false,
          prevTicket: _.cloneDeep(this.state.ticket),
        });

        if (this.state.ticket.status === "CLOSED") {
          this.changePage();
        }
        return;
      }
    } catch (error) {
      alert(`Update failed: ${error}`);
    }
  };

  //   Handle user interface inputs for bug ticket
  onInputChange = (event) => {
    switch (event.target.id) {
      // Handle changes of bug status
      case "OPEN":
      case "IN PROGRESS":
        // this.setState({ prevTicket: _.cloneDeep(this.state.ticket) });
        this.setTicketState("status", event.target.id);
        this.setTicketState("closed_by", "");
        // Update and changes to the bug from ticket state
        this.updateBug();
        break;

      case "CLOSED":
        this.setState({
          //   prevTicket: _.cloneDeep(this.state.ticket),
          renderClosePopup: true,
        });
        this.setTicketState("status", event.target.id);
        break;

      default:
        //  Handle all other field changes
        this.setTicketState(event.target.id, event.target.value);
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
  showEditDescription = (event) => {
    event.preventDefault();
    this.setState({
      renderEditDescription: true,
    });
  };

  //   Close the description or close function modals
  handleCloseModal = (event) => {
    event.preventDefault();
    // // Rollback changes & hide modals
    this.setState({
      ticket: _.cloneDeep(this.state.prevTicket),
      renderClosePopup: false,
      renderEditDescription: false,
    });
  };

  dropDown = () => {
    let { status } = this.state.ticket;
    const { statusList } = this.state;

    return (
      <>
        <Button variant={statusList[status][0]} className="statusButton mr-2">
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
            <div className="popup-content p-4 popup-mobile-grid-container">
              <div>
                <h1 className="text-center">EDIT BUG DESCRIPTION</h1>
                <Form
                  id="descriptionForm"
                  onSubmit={this.updateBug}
                  className="eb-description-width"
                >
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
                      className="btn btn-primary mt-2 display-inline"
                    >
                      SAVE
                    </Button>
                    <div className="x-spacer display-inline" />
                    <Button
                      id="editDescriptionClose"
                      variant="danger"
                      className="btn mt-2 display-inline"
                      onClick={this.handleCloseModal}
                    >
                      CANCEL
                    </Button>
                  </Form.Group>
                </Form>
              </div>
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

  renderBugMediaQuery = (ticket) => {
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
              {matches.desktop && this.renderBug(ticket)}
              {matches.tablet && this.renderBug(ticket)}
              {matches.mobile && this.renderBug(ticket)}
            </Fragment>
          )}
        </Media>
      </div>
    );
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

  renderBug = (ticket) => {
    return (
      <div className="eb-grid-container">
        <h6>
          <Link to={this.state.root}>BUG LIST</Link>{" "}
          {"> BUG #" + ticket.ticket_num}
        </h6>
        <h3 className="word-wrap-anywhere">{ticket.subject}</h3>
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
                  <td>
                    {ticket.created_at.split("T")[0].split("-")[1]}/
                    {ticket.created_at.split("T")[0].split("-")[2]}
                  </td>
                </tr>
                <tr>
                  <td>DATE CLOSED</td>
                  <td>{this.returnClosedStatus(ticket)}</td>
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

  //   renderBugMobile = (ticket) => {
  //     return (
  //       <div className="eb-grid-container">
  //         <h6>
  //           <Link to={this.state.root}>BUG LIST</Link>{" "}
  //           {"> BUG #" + ticket.ticket_num}
  //         </h6>
  //         <h3 className="word-wrap-anywhere">{ticket.subject}</h3>
  //         <div className="eb-grid-bug-container">
  //           <div className="eb-info eb-bug-section">
  //             <Table striped bordered className="eb-table-container">
  //               <thead>
  //                 <tr>
  //                   <th>BUG #{ticket.ticket_num}</th>
  //                   <th>{this.dropDown()}</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>SEVERITY LEVEL</td>
  //                   <td>{ticket.severity}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>DATE OPENED</td>
  //                   <td>
  //                     {ticket.created_at.split("T")[0].split("-")[1]}/
  //                     {ticket.created_at.split("T")[0].split("-")[2]}
  //                   </td>
  //                 </tr>
  //                 <tr>
  //                   <td>DATE CLOSED</td>
  //                   <td>{this.returnClosedStatus(ticket)}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>REPORTED BY</td>
  //                   <td>{ticket.opened_by}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>CLOSED BY</td>
  //                   <td>{ticket.closed_by}</td>
  //                 </tr>
  //               </tbody>
  //             </Table>
  //           </div>
  //           {this.renderDescription()}
  //         </div>
  //       </div>
  //     );
  //   };

  render() {
    const { ticket } = this.state;

    if (ticket) {
      return (
        <div className="side-content-container p-4">
          {this.renderBugMediaQuery(ticket)}
          {this.renderClosePopup()}
          {this.renderEditDescription()}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default EditBug;
