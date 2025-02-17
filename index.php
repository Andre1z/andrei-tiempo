<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>andrei-tiempo</title>
  <link rel="stylesheet" href="estilo.css">
  <link rel="icon" type="image/wepb" href="img/logo.webp">
</head>
<body>
  <div class="weather-container">
    <img src="img/logo.webp" alt="Logo Pronostico" class="weather-logo">
    <h1>andrei-tiempo</h1>
    <form id="weatherForm">
      <input type="text" id="cityInput" placeholder="Escribe una ciudad" required>
      <button type="submit">Ver pronóstico</button>
    </form>

    <!-- Current Weather Section -->
    <div id="currentWeather">
      <h2 id="currentCity"></h2>
      <div id="currentTemp"></div>
      <div id="currentDetails">
        <div>Precipitaciones: <span id="precipitation"></span></div>
        <div>Humedad: <span id="humidity"></span></div>
        <div>Viento: <span id="wind"></span></div>
      </div>
      <div id="currentCondition"></div>
    </div>

    <!-- Hourly Forecast Section -->
    <div id="hourlyForecast">
      <h3>Pronóstico por horas</h3>
      <div id="hourlyItems"></div>
    </div>

    <!-- 7-Day Forecast Section -->
    <div id="weeklyForecast">
      <h3>Predicción 7 días</h3>
      <div id="weeklyItems"></div>
    </div>
  </div>
  <button id="themeToggle">🌙 Dark Mode</button>
  <script src="script.js"></script>
</body>
</html>