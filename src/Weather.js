// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Api from "./Api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import Search from "./Search";
import CurrentLocation from "./CurrentLocation";
import TodayForecast from "./TodayForecast";
import Forecast from "./Forecast";

import "./Weather.sass";

Weather.propTypes = {
  city: PropTypes.string.isRequired
};

export default function Weather(props) {
  const [build, setBuild] = useState(false);
  const [todayWeather, setTodayWeather] = useState({});
  let today_ = new Date();

  function getWeekDay(date) {
    let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = date.getDay();
    return weekdays[day];
  }

  function showTodayData(response) {
    console.log(response);
    setTodayWeather({
      time:
        getWeekDay(today_) +
        ` - ` +
        today_.getFullYear() +
        `/` +
        (today_.getMonth() + 1) +
        `/` +
        today_.getDate(),
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      max: Math.round(response.data.main.temp_max),
      min: Math.round(response.data.main.temp_min),
      icon: response.data.weather[0].icon,
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
      clouds: Math.round(response.data.clouds.all)
    });
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


  useEffect(() => {
    loadCity(props.city);
    setBuild(true);
      // eslint-disable-next-line 
  }, [props.city]);

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
              {/*<span className="align-middle icon-current-location">
                <FontAwesomeIcon icon="map-marker-alt" alt="Current location" />{" "}
              </span>*/}
            </h1>

            <h6> {/*Updated <span id="update_time">0</span> min ago*/}</h6>
          </Col>
          <Col xs={5}>
            <Nav className="px-4 justify-content-end">
              <Nav.Item className="nested col-2 px-4">
                <CurrentLocation refresh={loadCurrentLocation}/>
              </Nav.Item>
              <Nav.Item className="nested col-2 px-4">
                <Search refresh={loadCity} />
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        <Row className="current-date">
          <h2 id="today-date"> Today | {todayWeather.time} </h2>
        </Row>
        <TodayForecast
          temp={todayWeather.temperature}
          icon={todayWeather.icon}
          max={todayWeather.max}
          min={todayWeather.min}
          humidity={todayWeather.humidity}
          wind={todayWeather.wind}
          clouds={todayWeather.clouds}
        />

        <Row className="clearfix justify-content-around next-days-forecast">
          <Forecast city={todayWeather.city} />
        </Row>

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
    return (
      <Container className="weather-app">
        <Row className="justify-content-start">
          <Col xs={7}>
            <h1 id="city-name">City not found</h1>
            <h6> please refresh the page</h6>
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
