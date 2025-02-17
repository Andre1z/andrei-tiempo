document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  const ciudad = document.getElementById('cityInput').value;
  getWeather(ciudad);
});

function getWeather(ciudad) {
  const apiKey = '1d5b279592277375f0d389d4370a2dd8'; // Replace with your OpenWeatherMap API key
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayCurrentWeather(data);
      } else {
        displayError(data.message);
      }
    })
    .catch(error => {
      displayError('An error occurred. Please try again.');
    });

  // Fetch hourly and 7-day forecast
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '200') {
        displayHourlyForecast(data.list);
        displayWeeklyForecast(data.list);
      } else {
        displayError(data.message);
      }
    })
    .catch(error => {
      displayError('An error occurred. Please try again.');
    });
}

function displayCurrentWeather(data) {
  const currentCity = document.getElementById('currentCity');
  const currentTemp = document.getElementById('currentTemp');
  const precipitation = document.getElementById('precipitation');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const currentCondition = document.getElementById('currentCondition');

  currentCity.textContent = `${data.name}, ${data.sys.country}`;
  currentTemp.innerHTML = `
    ${Math.round(data.main.temp)}°C 
    <span class="min-max">(${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C)</span>
  `;
  precipitation.textContent = '0%'; // OpenWeatherMap doesn't provide precipitation in the current weather API
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} m/s`;
  currentCondition.textContent = data.weather[0].description;
}


function displayHourlyForecast(forecastData) {
  const hourlyItems = document.getElementById('hourlyItems');
  hourlyItems.innerHTML = '';

  // Display the next 8 hours of forecast
  forecastData.slice(0, 8).forEach(item => {
    const time = new Date(item.dt * 1000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
    const temp = Math.round(item.main.temp);
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    hourlyItems.innerHTML += `
      <div class="hourly-item">
        <div>${time}</div>
        <img src="${icon}" alt="${item.weather[0].description}">
        <div>${temp}°C</div>
      </div>
    `;
  });
}

function displayWeeklyForecast(forecastData) {
  const weeklyItems = document.getElementById('weeklyItems');
  weeklyItems.innerHTML = '';

  const dailyForecast = {};

  // Group forecast data by day to find min and max temperatures
  forecastData.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
    if (!dailyForecast[date]) {
      dailyForecast[date] = { min: item.main.temp, max: item.main.temp, icon: item.weather[0].icon };
    } else {
      dailyForecast[date].min = Math.min(dailyForecast[date].min, item.main.temp);
      dailyForecast[date].max = Math.max(dailyForecast[date].max, item.main.temp);
    }
  });

  // Display forecast for the next 7 days
  Object.entries(dailyForecast).slice(0, 7).forEach(([date, data]) => {
    const dayName = new Date(date).toLocaleDateString('en', { weekday: 'short' });
    const icon = `https://openweathermap.org/img/wn/${data.icon}.png`;

    weeklyItems.innerHTML += `
      <div class="weekly-item">
        <div>${dayName}</div>
        <img src="${icon}" alt="weather icon">
        <div>${Math.round(data.min)}°C / ${Math.round(data.max)}°C</div>
      </div>
    `;
  });
}


function displayError(message) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<div class="error">${message}</div>`;
}
document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');

  // Change button text/icon based on mode
  if (document.body.classList.contains('dark-mode')) {
    this.textContent = '☀️ Light Mode';
  } else {
    this.textContent = '🌙 Dark Mode';
  }

  // Save mode in localStorage
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Apply saved theme on load
window.addEventListener('load', function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '☀️ Light Mode';
  }
});
