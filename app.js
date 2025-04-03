// app.js
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
    
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(response => response.json())
      .then(data => displayWeather(data))
      .catch(err => {
        console.error(err);
        alert('Error fetching weather data.');
      });
  });
  
  function displayWeather(data) {
    const resultDiv = document.getElementById('weather-result');
    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }
    
    const { name, main, weather } = data;
    resultDiv.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${main.temp} °C</p>
      <p>Humidity: ${main.humidity} %</p>
      <p>Conditions: ${weather[0].description}</p>
    `;
  }
  