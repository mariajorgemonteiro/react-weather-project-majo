import React, { useState } from "react";
import PropTypes from "prop-types";
import Api from "./Api";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import "./Forecast.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Forecast.propTypes = {
  city: PropTypes.string.isRequired
};
const axios = require('axios');

export default function Forecast(props) {
  const [data, setData] = useState([]);

  function getWeekDay(date) {
    let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = date.getDay();
    return weekdays[day];
  }

  function friendlyDate(date){
   return date.getDate() +`/` + (date.getMonth() + 1);  
  }

  // eslint-disable-next-line
  function refreshForecast(city) {
    console.log(`${Api.url}/forecast?q=${city}&appid=${Api.key}&units=metric`);
    axios
      .get(`${Api.url}/forecast?q=${city}&appid=${Api.key}&units=metric`)
      .then(function(response) {
        let forecast = response.data.list;
        let dailyForecast = [7, 15, 23, 31, 39].map(index => {
          return {
            day: friendlyDate(new Date(forecast[index].dt * 1000)),
            weekday: getWeekDay(new Date(forecast[index].dt * 1000)),
            icon: forecast[index].weather[0].icon,
            temperature: Math.round(forecast[index].main.temp),
            max: Math.round(forecast[index].main.temp_max),
            min: Math.round(forecast[index].main.temp_min)
          };
        });
        setData({ dailyForecast });
        console.log(data);
      });
  }

  if (data) {
    return (
      <Col sm>
        <Card className="forecast-data">
          <Card.Body className="forecast-box">
            <Card.Title className="next-days">
              {" "}
              {data.weekday} <br /> {data.day}{" "}
            </Card.Title>
            <Card.Text className="text-center">
              <span className="icon-forecast">
                <FontAwesomeIcon icon={data.icon} />
                ­<br />
              </span>
              <span className="max-forecast">
                <span> {data.max} </span>
                <span>ºC</span>
                <br />
              </span>
              <span className="min-forecast">
                <span> {data.min} </span>
                <span>ºC</span>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  } else {
    return <div />;
  }
}
