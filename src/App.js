import Image1 from './images/weatherApp1.jpeg'
import Hot from './images/warmweather.webp'
import Fall from './images/fallWeather.jpeg'
import Spring from './images/springWeather.jpeg'
import Cold from './images/snowWeather.jpeg'

import './app.css'
import icon from './images/weatherIcon.png'
import Page from './pages/Page';
import { useEffect, useState} from 'react';
import {fetchWeather} from './redux/weatherSlices'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  //State to store the city and units for weather data
  const [City, setCity] = useState("");
  const [units, setUnits] = useState('metric')

  //Dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  //Fetch weather data when units change
  useEffect(() => {
    dispatch(fetchWeather(City, units))
  }, [units])

  //Selecting weather data from Redux store
  const { data: weather, loading, error } = useSelector(state => state.weather);


  //Function to change background image based on weather temperature
  const changeBackgroundImage = () => {
    if (!weather) {
      return Image1;
    }

    const temp = weather.main?.temp

    //Conditionally selecting background image based on temperature range
    if (temp <= 0) {
      return Cold;
    } else if (temp > 0 && temp <= 15) {
      return Fall;
    } else if (temp > 15 && temp <= 25) {
      return Spring;
    } else if (temp > 25) {
      return Hot;
    } else {
      return Image1
    }
  }
  
  //Function to handle unit change (Celsius or Fahrenheit)
  const handleUnitChange = (unit) => {
    setUnits(unit);
  };

  //Function to convert Celsius to Fahrenheit
  const convertCelsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${changeBackgroundImage()})` }}>
      <div className='divContainer'>
        <div className='container'>
          <div className='divSection divSectionInput'>
            <div className='labelInput'>
              <input 
                value={City}
                onChange={e => setCity(e.target.value)}
                type='text' name='text' placeholder='Enter City' />
              <button onClick={()=> dispatch(fetchWeather(City))}>Search</button>
            </div>
            <button className={`tempButton ${units === 'metric' ? '' : 'active'}`} onClick={() => handleUnitChange('imperial')}>
              °F
            </button>
            <button className={`tempButton ${units === 'metric' ? 'active' : ''}`} onClick={() => handleUnitChange('metric')}>
              °C
            </button>
          </div>
          <div className='divSection divSectionTemp'>
            <div className='temp'>
              {weather && (
                <>
                  <h2>{weather.name}, {weather.sys?.country}</h2>
                  <img src={icon} alt='' style={{ width: '80px', height: '80px' }} />
                  <p>{weather.weather[0].description}</p>
                </>
              )}
            </div>
            <div className='temperature'>
              <h3>{weather
                  ? `${Math.ceil(Number(units === 'metric' ? weather.main?.temp : convertCelsiusToFahrenheit(weather.main?.temp)))} °${units === 'metric' ? 'C' : 'F'}`
                  : 'Loading...'}</h3>
            </div>
          </div>
          <Page weather={weather}/>
        </div>
      </div>
    </div>
  );
}

export default App;
