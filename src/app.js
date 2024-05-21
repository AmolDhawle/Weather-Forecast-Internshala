document.addEventListener('DOMContentLoaded', () => {

  const apiKey = 'e5103872dfd9472df7a1fd116bcf67b8'; 

  document.getElementById('search-btn').addEventListener('click', handleCitySearch);
  document.getElementById('current-location-btn').addEventListener('click', getCurrentLocationWeather);

  function handleCitySearch() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
      fetchWeatherDataByCity(city);
    } else {
      alert('Please enter a valid city name');
    }
  }

  function fetchWeatherDataByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Current weather data:', data); // Log the received data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch weather data');
      });
  }
  
})



