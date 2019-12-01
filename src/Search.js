import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);


export default function Search(props) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    </span>
    ));
  const [value, setValue] = useState(null);

  function handleSubmit(event) {
    if (!event.target.checkValidity()) {
      return event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation();
      props.refresh(value);
    }
  }

  function updateLocation(event) {
    setValue(event.target.value);
  }

  return (
    <Dropdown alignRight>
      <Dropdown.Toggle as={CustomToggle}>
        <FontAwesomeIcon icon="search-location" className="menu-icons" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-search">
        <Form noValidate onSubmit={handleSubmit}>
          <InputGroup className="search-option">
            <Form.Control
              type="search"
              placeholder="Search a city..."
              name="city"
              onChange={updateLocation}
              autoComplete="off"
              autoFocus="on"
            />
            <Form.Control.Feedback type="invalid" className="invalid-tooltip">
              City not found
            </Form.Control.Feedback>
            <InputGroup.Append>
              <button type="submit" className="btn">
                {" "}
                <FontAwesomeIcon icon="search" aria-hidden="true" />
              </button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}
