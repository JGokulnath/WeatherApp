import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import SearchBar from "./Components/SearchBar.jsx";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Salem");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=91b8910d4617012f577beb656772738d`;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (isMounted) setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [location, url]);

  const searchLocation = (value) => {
    setLocation(value);
  };

  return (
    <div className="app">
      <div className="search">
        <SearchBar onSubmit={searchLocation} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name || "Location not found"}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main.feels_like ? `${data.main.feels_like.toFixed()}°F` : ""}
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main.humidity ? `${data.main.humidity}%` : ""}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? `${data.wind.speed.toFixed()} MPH` : ""}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
