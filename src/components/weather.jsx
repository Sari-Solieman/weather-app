import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
            const data = response.data;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            });

        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };

    useEffect(() => {
        fetchWeatherData('New York')
        console.log(weatherData);

    }, [])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <button className="search-btn" type="submit">Get Weather</button>
                </form>
                {weatherData && (
                    <div>
                        <h2>{weatherData.location}</h2>
                        <p>{weatherData.icon}</p>
                        <p>{weatherData.description}</p>
                        <p>Temperature: {weatherData.temperature} °C</p>
                        <p>Wind Speed: {weatherData.windSpeed} km/h</p>
                        <p>Humidity: {weatherData.humidity} %</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Weather;
