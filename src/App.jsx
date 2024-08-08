import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bfb46fd0a2a46cf39c4755fc8aba169c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(APIurl).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}&deg;C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like}&deg;C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.main ? (
                  <p className="bold">{data.wind.speed}km/h</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
