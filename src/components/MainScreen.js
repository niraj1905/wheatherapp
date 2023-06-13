import React, { useState, useEffect } from "react";

const api = {
  key: "c72b3f653cff6c05df45d03d0a38e001",
  base: "https://api.openweathermap.org/data/2.5/",
};

const MainScreen = (props) => {
  const [query, setQuery] = useState(""); /// data in form of object
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();

  // // current city Location
  const [current, setCurrent] = useState(null);

  // //current city weather
  const [currweat, setCurrweat] = useState(null);

  // current city temperature
  const [currtemp, setCurrtemp] = useState(null);

  // info of search city  weather 
  const [disp, setDisp] = useState(false);

  // if user put invalid city name
  const [err,setErr] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      //   console.log("Latitude is :", position.coords.latitude);
      //   console.log("Longitude is :", position.coords.longitude);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          //setWeather(data);
          setCurrent(data.name);
          setCurrweat(data.weather[0].main);
          setCurrtemp(data.main.temp);
        //   console.log(data);
        })
        .catch((error) => console.log(error));
    });
  });

  function dataSubmit() {
    if (query) {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          //    console.log(result);
          setCity(result.name); //city name
          setTemp(result.main.temp); //city temp
          setWeather(result.weather[0].main); // city weather
          setHumidity(result.main.humidity);
          setPressure(result.main.pressure);
          setQuery("");
          setDisp(true);
          setErr(false);
        })
        .catch((error)=>{
            console.log("invalid city")
            setDisp(false);
            setErr(true);
        });
    } else {
      setDisp(false);
      console.log()
    }
  }

  function dateBuilder(d) {
    // months Name
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${date} ${month} ${year}`;
  }

  function weekDay(d) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    return `${day}`;
  }

  return (
    <div className="mainscreen">
      <div className="current-loc-weather">
        <div className="current-loc">
          <h1>{current}</h1>
          <p>{currweat}</p>
          <p>{currtemp} &#8451;</p>
        </div>

        <div className="current-date">
          <p className="week">{weekDay(new Date())}</p>
          <p className="date">{dateBuilder(new Date())}</p>
        </div>
      </div>

      <div className="search-loc-weather">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search City..."
        />
        <button onClick={dataSubmit}>Search</button>

        {disp ? (
          <div className="display-search-weather">
            <p>City : {city}</p>
            <p>Weather : {weather}</p>
            <p>Temperature : {temp} &#8451;</p>
            <p>Humidity : {humidity} %</p>
            <p>Pressure : {pressure} hPa</p>
          </div>
        ) : 
          err?<p>Invalid City</p>:""
        }
      </div>
    </div>
  );
};

export default MainScreen;
