const apiKey = 'cb9b1cd447a855edb6c484467aec9ff6';

function getWeather() {
    const input = document.getElementById('city').value;

    // Check if the input is a number (which indicates a zip code)
    if (!isNaN(input)) {
        // If input is a number, treat it as a zip code
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${apiKey}`;
        fetchWeather(apiUrl);
    } else {
        // If input is not a number, treat it as a city name
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
        fetchWeather(apiUrl);
    }
}

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const highTemp = kelvinToFahrenheit(data.main.temp_max);
            const lowTemp = kelvinToFahrenheit(data.main.temp_min);
            const forecast = data.weather[0].description;
            const humidity = data.main.humidity;

            document.getElementById('weather-title').textContent = `${city} Weather`;
            document.getElementById('high-temp').textContent = `H ${highTemp}°F`;
            document.getElementById('low-temp').textContent = `L ${lowTemp}°F`;
            document.getElementById('forecast').textContent = `Forecast: ${forecast}`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;

            getImage(city);
        })
        .catch(error => console.error('Error:', error));
}

function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

function getImage(city) {
    const unsplashApiKey = 'cN1zUOIwlpy_cJaqqo8CHfeoCqIBVKSEb2fceVVwlPM';
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;

    fetch(unsplashApiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.results[0].urls.regular;
            document.getElementById('city-image').src = imageUrl;
        })
        .catch(error => console.error('Error:', error));
}
