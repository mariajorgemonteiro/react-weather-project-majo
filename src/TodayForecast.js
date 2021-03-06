import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./TodayForecast.css";

export default function TodayForecast(props) {
  return (
    <div className="row clearfix align-center text-center current-data-info">
      <div className="col-5 float-left">
        <div className="row">
          <div className="col icon-today float-left">
            <WeatherIcon icon={props.data.icon} size={90}/>
          </div>
          <div className="col float-right today-temp">
            <h3 className="current-today">
              {" "}
              <span>{props.data.temperature}</span>
              <span>ºC</span>
            </h3>
            <h5 className="min-max-today">
              {" "}
              <span>{props.data.max}</span>
              <span>ºC </span> / <span>{props.data.min}</span>
              <span>ºC</span>
            </h5>
          </div>
        </div>
      </div>
      {/*
      <div className="col-2">
        <div className="line-change-values">
          <a className="btn btn-link btn-change-values" href="_">
            <h3 id="temp-variable-link">ºF</h3>
          </a>
        </div>
      </div>
      */}
      <div className="col-5 float-right my-auto">
        <div className="weather-more-info">
          <p className="weather-more-info-text">
            {" "}
            Humidity: <span>{props.data.humidity}</span>%
          </p>
          <p className="weather-more-info-text">
            Wind: <span>{props.data.wind}</span> km/h
          </p>
          <p className="weather-more-info-text">
            Clouds: <span>{props.data.clouds}</span>%
          </p>
        </div>
      </div>
    </div>
  );
}
