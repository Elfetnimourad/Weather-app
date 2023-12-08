import React, { useEffect, useState } from "react";
import "./weatherApp.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Grid } from "@mui/material";
import clear_Icon from "./Assets/clear.png";
import humide_Icon from "./Assets/humidity.png";
import wind_Icon from "./Assets/wind.png";
import cloud_Icon from "./Assets/cloud.png";
import rain_Icon from "./Assets/rain.png";
import snow_Icon from "./Assets/snow.png";
import drizzle_Icon from "./Assets/drizzle.png";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  let api_key = "37080b387b0944bca0ef672a03381bcb";

  const search = () => {
    let url_search = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(url_search)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };
  useEffect(() => {
    if (city.trim() !== "") {
      search();
    }
  }, [city]);
  const imageComp = () => {
    if (weather?.weather && weather.weather[0]?.main) {
      const weatherMain = weather.weather[0].main.toLowerCase();

      if (weatherMain === "clear") {
        return (
          <img
            className="card-img weather-State"
            src={clear_Icon}
            alt="weather"
          />
        );
      } else if (weatherMain === "clouds") {
        return (
          <img
            className="card-img weather-State"
            src={cloud_Icon}
            alt="weather"
          />
        );
      } else if (weatherMain === "rain") {
        return (
          <img
            className="card-img weather-State"
            src={rain_Icon}
            alt="weather"
          />
        );
      } else if (weatherMain === "snow") {
        return (
          <img
            className="card-img weather-State"
            src={snow_Icon}
            alt="weather"
          />
        );
      } else if (weatherMain === "drizzle") {
        return (
          <img
            className="card-img weather-State"
            src={drizzle_Icon}
            alt="weather"
          />
        );
      }
    } else if (city.trim() === "") {
      return <img className="weather-State" alt="" />;
    }
  };
  return (
    <div className="weather-content">
      <div className="container">
        <div className="card">
          <Grid container>
            <Grid item xs={10}>
              <input
                type="text"
                className="form-control inputStyle"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <button className="btnStyle" onClick={search}>
                <SearchRoundedIcon />
              </button>
            </Grid>
          </Grid>
          {imageComp()}
          <h1 className="text-center">
            {city && Math.floor(weather?.main?.temp - 273)}°C
          </h1>
          <h2 className="text-center cityName">{weather?.name}</h2>

          <div className="here">
            <img
              className="card-img humidity-icon me-auto "
              src={humide_Icon}
              alt=""
            />
            <div>
              <h6>{weather?.main?.humidity}%</h6>
              <h6>Humidity</h6>
            </div>
            <img className="card-img wind-icon" src={wind_Icon} alt="" />
            <div>
              <h6>{weather?.wind?.speed}km/h</h6>
              <h6>Wind Speed</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
