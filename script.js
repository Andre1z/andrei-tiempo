document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    const ciudad = document.getElementById('cityInput').value;
    getWeather(ciudad);
  });
  
  function getWeather(ciudad) {
    const apiKey = '1d5b279592277375f0d389d4370a2dd8'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          displayWeather(data);
        } else {
          displayError(data.message);
        }
      })
      .catch(error => {
        displayError('An error occurred. Please try again.');
      });
  }
  
  function displayWeather(data) {
    const tiempoResultado = document.getElementById('weatherResult');
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
    tiempoResultado.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${weatherIcon}" alt="Weather Icon" class="weather-icon">
      <div class="weather-info">${data.weather[0].description}</div>
      <div class="weather-info">Temperatura: ${data.main.temp}°C</div>
      <div class="weather-info">Huminidad: ${data.main.humidity}%</div>
      <div class="weather-info">Viento: ${data.wind.speed} m/s</div>
    `;
  }
  
  function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<div class="error">${message}</div>`;
  }