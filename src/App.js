import React, { useEffect, useState } from "react";
import Video from '../src/pexels_videos_2049255 (1080p).mp4';
import "./App.css";
const api = {
  key: "00ea460c716b9818f8b0393b441f29aa",
  base: "https://api.openweathermap.org/data/2.5/",
};
const App = () => {
  const [time, setTime] = useState("");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  function formatTime(val) {
    if (val < 10) {
      return "0";
    } else {
      return "";
    }
  }
  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);

    return function cleanUp() {
      clearInterval(timerId);
    };
  });

  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const liveData = d.getDate();

    setTime(
      formatTime(h) + h + ":" + formatTime(m) + m + ":" + formatTime(s) + s
    );
  }
  function searchPress() {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }
  return (
    <div className="App">
   <video  autostart autoPlay loop src={Video} type="video/mp4" />
      <div className="search">
        <input
          type="text"
          placeholder="search here"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={searchPress}>Search</button>
      </div>

      <section className="box">
        {typeof weather.main !== "undefined" ? (
          <div className="cards">
            <div className="container">
              <div className="top">
                <div className="location">
                  <h1>{weather.name} </h1>
                  {/* //time */}
               

                  <div className="clock">
                    <div className="screen">
                      <h1 className="time">{time}</h1>
                    </div>
                  </div>
                </div>
                <div className="temp">
                  <h1>{weather.main.temp} &deg;</h1>
                  <p>Latitude :{weather.coord.lat}</p>
                </div>
                <div className="description">
                  {/* <p>{weather.weather[0].main}</p> */}
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                <p className="bold">
                  {" "}
                  Desc : ({weather.weather[0].description})
                </p>
                <p>Speed : {weather.wind.speed}</p>
                <p> Degree : {weather.wind.deg}</p>
              </div>
              <div className="humidity">
                <p className="bold">Time Zone:{weather.timezone}</p>
               
              </div>
              <div className="wind">
                <p className="bold">Feels Like : {weather.main.feels_like}</p>
                <p>Pressure: {weather.main.pressure}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="not">NOT FOUND</div>
        )}
      </section>
    </div>
  );
};

export default App;
