import React from "react";

export default function FormatedDateTime(props) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let index = props.date.getDay();
  let weekday = weekdays[index];
  let year = props.date.getFullYear();
  let month = props.date.getMonth() + 1;
  let day = props.date.getDate();
  let hour = props.date.getHours();
  if (day < 10) {
    day = `0${day}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = props.date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return (
    <div>
      {weekday} ⏲ {hour}:{minutes}  <br />
       <sub>{year}/{month}/{day}</sub>
    </div>
  );
}
