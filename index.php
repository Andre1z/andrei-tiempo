<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>andrei-tiempo</title>
  <link rel="Stylesheet" href="estilo.css">
</head>
<body>
  <div class="weather-container">
    <h1>andrei-tiempo</h1>
    <form id="weatherForm">
      <input type="text" id="cityInput" placeholder="Escribe un ciudad" required>
      <button type="submit">Ver tiempo</button>
    </form>
    <div id="weatherResult">
      <!-- Weather data will be displayed here -->
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>