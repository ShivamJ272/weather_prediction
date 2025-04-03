// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = 'e2de434db3e7971b557d1679f32343a1'; 

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required.' });
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(weatherUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
