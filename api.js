let weatherData = {
  temp: 25,
  wind: 5
};

async function loadWeather() {
  try {
    // coordenadas aproximadas de Goiás
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-16.7&longitude=-49.3&current_weather=true";
    const res = await fetch(url);
    const data = await res.json();

    weatherData.temp = data.current_weather.temperature;
    weatherData.wind = data.current_weather.windspeed;
  } catch (e) {
    console.log("Erro na API de clima:", e);
  }
}

loadWeather();
setInterval(loadWeather, 60000);
