import React, { Component } from "react";
import { Dropdown, Button, ButtonGroup, Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import "./css/BugList.css";
import "./css/EditBug.css";

class BugList extends Component {
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
          <Dropdown.Item eventKey="3" className="eb-closed">
            CLOSED
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  dropDownButton = (status, style) => {
    return (
      <Button variant={style} disabled>
        {status}
      </Button>
    );
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
        <h3>BUG LIST {">"} BUG #1</h3>
        <div className="p-4">
          <h3>SUBJECT TEXT GOES HERE AS BUG TITLE</h3>
          <div className="eb-grid-container">
            <div class="eb-info">
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
            <div class="eb-image display-1">
              <FontAwesomeIcon icon={faBug} style={{ color: "orange" }} />
            </div>
            <div class="eb-description-entry">
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
      </div>
    );
  }
}

export default BugList;
