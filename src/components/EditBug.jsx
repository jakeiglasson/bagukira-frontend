import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import "./css/BugList.css";
import "./css/EditBug.css";

class BugList extends Component {
  state = {
    renderClosePopup: "",
  };
  constructor(props) {
    super(props);
    // console.log("constructor");
    this.state = {
      renderClosePopup: false,
    };
  }

  dropDown = () => {
    return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle id="dropdown-custom-1">SET STATUS</Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark">
          <Dropdown.Item eventKey="1" className="eb-open">
            OPEN
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" className="eb-in-progress">
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
    // console.log("executing: ", "handleStatusChange", "- status: ", status);

    switch (status) {
      case "OPEN":
        break;

      case "IN PROGRESS":
        break;

      case "CLOSED":
        // console.log("switch case: CLOSED");
        this.setState({ renderClosePopup: true });
        break;
    }
  };

  handleCancelClose = () => {
    // console.log("executing:", "handleCancelClose");
    this.setState({ renderClosePopup: false });
  };

  dropDownButton = (status, style) => {
    return (
      <Button variant={style} disabled>
        {status}
      </Button>
    );
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
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>PLEASE ENTER YOUR NAME</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
              <Link to="../bug-list">
                <Button variant="primary" type="submit">
                  CLOSE BUG
                </Button>{" "}
              </Link>

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
        style = "outline-danger";
        break;

      case "IN PROGRESS":
        style = "outline-warning";
        break;

      case "CLOSED":
        style = "outline-success";
        break;
    }

    return this.dropDownButton(status, style);
  };

  render() {
    return (
      <div className="side-content-container p-4">
        <div className="">
          <h6>
            <Link to="../bug-list">BUG LIST</Link> {">"} BUG #1
          </h6>
          <h3>SUBJECT TEXT GOES HERE AS BUG TITLE</h3>
          <div className="eb-grid-container">
            <div className="eb-info">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>BUG #1</th>
                    <th>
                      {this.status("CLOSED")} {this.dropDown()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DATE OPENED</td>
                    <td>1/1/2020</td>
                  </tr>
                  <tr>
                    <td>DATE CLOSED</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>REPORTED BY</td>
                    <td>JOHN DOE</td>
                  </tr>
                  <tr>
                    <td>CLOSED BY</td>
                    <td>-</td>
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
        {this.renderClosePopup()}
      </div>
    );
  }
}

export default BugList;
