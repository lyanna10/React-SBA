import React from 'react'
import './pages.css'

function Page({ weather }) { //Displays weather information based on the provided 'weather' prop.
    
    //Check if 'weather' data is available
    if (!weather) {
        //If 'weather' is not available, show a message, asking the user to enter a city name.
        return <div className="pageDiv describeDiv" style={{color: 'red'}}>Type in a city name in the search input to see weather!</div>;
    }
    

    //If 'weather' data is available, display the weather information as follow. 
  return (
    <div className='pageDiv describeDiv'>
          <p>Weather condition in {weather?.name}, {''}
                {weather?.sys?.country} is described as {''}
                {weather?.weather[0].description} with temperature of {''}
                {Math.ceil(Number(weather?.main?.temp))} °C and humidity of {''}
                {weather?.main?.humidity}%
            </p>
    </div>
  )
}

export default Page