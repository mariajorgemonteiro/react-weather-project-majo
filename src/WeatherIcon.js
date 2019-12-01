import React from "react";
import PropTypes from "prop-types";
import ReactAnimatedWeather from "react-animated-weather";

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string
};

export default function WeatherIcon(props) {
  let iconMap = {
    "01n": "CLEAR_NIGHT",
    "01d": "CLEAR_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "03n": "CLOUDY",
    "03d": "CLOUDY",
    "04n": "CLOUDY",
    "04d": "CLOUDY",
    "09n": "SLEET",
    "09d": "SLEET",
    "10n": "RAIN",
    "10d": "RAIN",
    "11n": "SLEET",
    "11d": "SLEET",
    "13n": "SNOW",
    "13d": "SNOW",
    "50n": "FOG",
    "50d": "FOG"
  };

  return (
    <ReactAnimatedWeather
      icon={iconMap[props.icon]}
      animate={true}
      color="grey"
      size={props.size}
    />
  );
}
