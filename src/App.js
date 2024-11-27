import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import SearchBar from "./Components/SearchBar.jsx";
function App() {
  const [data,setData]=useState({});
  const [location,setLocation] = useState('Salem');
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=91b8910d4617012f577beb656772738d`

  useEffect(()=>{
    axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
    })
  },[location])
  const searchLocation = (value) =>{
    setLocation(value);
  }

  return (
    <div className="app">
      <div className="search">
        <SearchBar onSubmit={searchLocation}/>
      </div>
     <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ?<h1>{data.main.temp.toFixed()}°F</h1>: null} 
        </div>
        <div className="description">
          {data.weather?<p>{data.weather[0].main}</p>:null}
          
        </div>
      </div>
      {data.main!==undefined &&
      <div className="bottom">
        <div className="feels">
          {data.main?<p className="bold">{data.main.feels_like}°F</p>:null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {data.main?<p className="bold">{data.main.humidity}%</p>:null}
          <p>Humitidy</p>
        </div>
        <div className="wind">
          {data.wind?<p className="bold">{data.wind.speed} MPH</p>:null}
          <p>Wind Speed</p>
        </div>
      </div>
    }
     </div>
    </div>
  );
}

export default App;
