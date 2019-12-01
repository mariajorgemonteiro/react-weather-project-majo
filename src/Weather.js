// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Api from "./Api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import FormatedDateTime from "./FormatedDateTime";
import Search from "./Search";
import CurrentLocation from "./CurrentLocation";
import TodayForecast from "./TodayForecast";
import Forecast from "./Forecast";

import "./Weather.css";

export default function Weather(props) {
  const [build, setBuild] = useState(false);
  const [todayWeather, setTodayWeather] = useState({});

  function showTodayData(response) {
    console.log(response);
    setTodayWeather({
      time: new Date(response.data.dt * 1000),
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      max: Math.round(response.data.main.temp_max),
      min: Math.round(response.data.main.temp_min),
      icon: response.data.weather[0].icon,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      clouds: Math.round(response.data.clouds.all)
    });

    setBuild(true);
  }

  function refreshWeather(params) {
    console.log(`${Api.url}/weather?${params}&appid=${Api.key}&units=metric`);
    axios
      .get(`${Api.url}/weather?${params}&appid=${Api.key}&units=metric`)
      .then(showTodayData);
  }

  function loadCity(city) {
    refreshWeather(`q=${city}`);
  }

  function loadCurrentLocation(latitude, longitude) {
    refreshWeather(`lat=${latitude}&lon=${longitude}`);
  }

  if (build) {
    return (
      <Container className="weather-app">
        <Row className="justify-content-start">
          <Col xs={7}>
            <h1 id="city-name">
              {todayWeather.city}{" "}
             
            </h1>

            <h6> {/*Updated <span id="update_time">0</span> min ago*/}</h6>
          </Col>
          <Col xs={5}>
            <Nav className="px-4 justify-content-end">
              <Nav.Item className="nested col-2 px-4">
                <CurrentLocation refresh={loadCurrentLocation} />
              </Nav.Item>
              <Nav.Item className="nested col-2 px-4">
                <Search refresh={loadCity} />
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row className="current-date">
          <h2 id="today-date">
            {" "}
            <FormatedDateTime date={todayWeather.time} />{" "}
          </h2>
        </Row>
        <TodayForecast data={todayWeather} />

        <Forecast city={todayWeather.city} />

        <Row className="app-bottom">
          <div>
            {" "}
            <a
              href="https://github.com/mariajorgemonteiro/weather-project-majo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-source code
            </a>{" "}
            by 👩‍💻{" "}
            <a
              href="https://www.linkedin.com/in/mariajorgemonteiro/"
              target="_blank"
              rel="noopener noreferrer"
              title="Author Copyright"
            >
              {" "}
              Maria Jorge Monteiro
            </a>
          </div>
        </Row>
      </Container>
    );
  } else {
    loadCity(props.city);

    return (
      <Container className="weather-app">
        <Row className="justify-content-start">
          <Col xs={7}>
            <h1 id="city-name">City not found</h1>
            <h6> please refresh the page.</h6>
          </Col>
        </Row>

        <Row className="app-bottom">
          <div>
            {" "}
            <a
              href="https://github.com/wecodeschool/vanilla-weather"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-source code
            </a>{" "}
            by 👩‍💻{" "}
            <a
              href="https://www.linkedin.com/in/mariajorgemonteiro/"
              target="_blank"
              rel="noopener noreferrer"
              title="Author Copyright"
            >
              {" "}
              Maria Jorge Monteiro
            </a>
          </div>
        </Row>
      </Container>
    );
  }
}
