import React, { useState } from "react";
import axios from "axios";
import { icons } from "../scripts/icons";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
            const data = response.data;


            const icon = icons[data.weather[0].icon]

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                description: data.weather[0].description,
                icon: icon
            });

        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData(city);
    };

    return (
        <>
            <div className="weather-app">
                <div className="weather-card">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                        <button className="btn" type="submit">Get Weather</button>
                    </form>
                    {weatherData && (
                        <div className="weather-card">
                            <h2>{weatherData.location}</h2>
                            <img src={weatherData.icon} className="weather-condition" />
                            <div>{weatherData.description}</div>
                            <div className="temperature">{weatherData.temperature}°C</div>
                            <div className="condition-details">
                                <div className="condition-details">
                                    <img src="/assets/wind.png" className="condition-img" />
                                    <div>
                                        {weatherData.windSpeed} km/h
                                        <br />
                                        Wind Speed
                                    </div>
                                </div>
                                <div className="condition-details">
                                    <img src="/assets/humidity.png" className="condition-img" />
                                    <div>
                                        {weatherData.humidity}%
                                        <br />
                                        Humidity
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div >
            </div>
        </>
    );
};

export default Weather;
