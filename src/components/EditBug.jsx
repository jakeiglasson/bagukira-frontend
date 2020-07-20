import React, { Component } from "react";
import { Dropdown, Button, ButtonGroup, Table } from "react-bootstrap";
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
        <div className="p-5">
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
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div class="eb-image"></div>
            <div class="eb-description-entry"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BugList;
