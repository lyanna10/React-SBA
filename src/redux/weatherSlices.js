import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//API Key for OpenWeatherMap API
const apiKey = '18c9f014354f9fea0fc5563639daaa0a';


//action fetch 
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async(payload, {dispatch}, units = 'metric') => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${apiKey}&units=${units}`
      );
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);


//createSlice using Redux toolkit
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {}, //Setting the initial state to an empty object.
    extraReducers: (builder) => { //ExtraReducers listens to the fetchWeather action and updates the weather state based on its status (pending, fulfilled, or rejected).
      builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; 
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
        
    },
    
})

export default weatherSlice.reducer