import React, { useState } from "react";
import Api from "./Api";
import WeatherIcon from "./WeatherIcon";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import "./Forecast.css";

const axios = require("axios");

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);

  function formatTime(date) {
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hour}:${minutes}`;
  }

  // eslint-disable-next-line
  function refreshForecast(city) {
    axios
      .get(`${Api.url}/forecast?q=${city}&appid=${Api.key}&units=metric`)
      .then(function(response) {
        console.log(response);
        setData(response.data);
        setLoaded(true);
      });
  }

  if (loaded && data.city.name === props.city) {
    return (
      <Row className="clearfix justify-content-around next-days-forecast">
        {data.list.slice(0, 5).map(function(weather) {
          return (
            <Col sm key={weather.dt_txt}>
              <Card className="forecast-data">
                <Card.Body className="forecast-box">
                  <Card.Title className="next-days">
                    {formatTime(new Date(weather.dt * 1000))}
                  </Card.Title>
                  <Card.Text className="text-center">
                    <span className="icon-forecast">
                      <WeatherIcon icon={weather.weather[0].icon} size={50} /> ­<br />
                    </span>
                    <span className="max-forecast">
                      <span> <sub>max </sub>{Math.round(weather.main.temp_max)} </span>
                      <br />
                    </span>
                    <span className="min-forecast">
                      <span> <sub>min </sub>{Math.round(weather.main.temp_min)}  </span>
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  } else {
    refreshForecast(props.city);
    return null;
  }
}
