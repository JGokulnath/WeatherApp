import React , { useEffect, useState }from 'react'
import {citiesNames} from './CityName'
import './SearchBar.css'
const SearchBar = (props) => {
    const [inputValue,setInputValue] = useState('');
    const [suggestedCities, setSuggestedCities] = useState([])
    const allCities = citiesNames;

    useEffect(() => {
        suggestedCitiesGenerator()
    }, [inputValue])

    const suggestedCitiesGenerator =() =>{
        if(inputValue.trim()){
            const newSuggestedCities = allCities.filter(city => city.toLowerCase().startsWith(inputValue.toLowerCase())).splice(0, 3)
            setSuggestedCities(newSuggestedCities);
        } else{
            setSuggestedCities([]);
        }
    }

    const suggestedCityClickHandler =(e) =>{
        if(inputValue===e.target.textContent){
            setSuggestedCities([]);
        }
        else{
            setInputValue(e.target.textContent)
            // setSearchedCity(e.target.textContent);
        }
    }

    const SubmitHandler= (e) =>{
        e.preventDefault();
        setInputValue('');
        props.onSubmit(inputValue);
    }
  return (
    <form onSubmit={SubmitHandler} className='form'>
     <input className='input'
        value={inputValue} 
        onChange={ async (event) => setInputValue(event.target.value)}
        onFocus={(e)=>{ suggestedCitiesGenerator(e)}}
        placeholder="Search a location..." 
        type="text"/>
        <button className='searchbtn'>🔍</button>

        <ul className='suggestedCities-list'>
                {suggestedCities.map((city, index) => 
                    (<li key={city + index} 
                    onClick={suggestedCityClickHandler} 
                    className='suggestedCities-item'>{city}</li>))}
            </ul>
    </form>
  )
}

export default SearchBar