import React, { useState } from "react";

export default function WeatherUnits(props) {
   function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }

  if (unit === "celsius") {
    return ( `${Math.round(props.celsius)}` )
  } else {
    return ( `${Math.round(fahrenheit())}` )
  }
}