import React, { useEffect, useState } from 'react';
import { citiesNames } from './CityName';
import './SearchBar.css';

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestedCities, setSuggestedCities] = useState([]);
  const allCities = citiesNames;

  useEffect(() => {
    if (inputValue.trim()) {
      const newSuggestedCities = allCities
        .filter((city) => city.toLowerCase().startsWith(inputValue.toLowerCase()))
        .slice(0, 3); // Use slice instead of splice to avoid mutating the original array
      setSuggestedCities(newSuggestedCities);
    } else {
      setSuggestedCities([]);
    }
  }, [inputValue , allCities]);

  const suggestedCityClickHandler = (e) => {
    const selectedCity = e.target.textContent;
    setInputValue(selectedCity);
    setSuggestedCities([]); // Clear suggestions after selecting
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(inputValue);
    setInputValue('');
    setSuggestedCities([]); // Clear suggestions on submit
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <input
        className="input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Search a location..."
        type="text"
      />
      <button type="submit" className="searchbtn">
        🔍
      </button>

      {suggestedCities.length > 0 && (
        <ul className="suggestedCities-list">
          {suggestedCities.map((city, index) => (
            <li
              key={`${city}-${index}`}
              onClick={suggestedCityClickHandler}
              className="suggestedCities-item"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
