import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function CurrentLocation(props) {
  function getCurrentLocation(event) {
    navigator.geolocation.getCurrentPosition(position => {
      props.refresh(position.coords.latitude, position.coords.longitude);
    });
  }

  return (
    <span
      className="align-middle menu-icons"
      onClick={event => getCurrentLocation(event)}
    >
      <FontAwesomeIcon icon="map-marker-alt" />
    </span>
  );
}
