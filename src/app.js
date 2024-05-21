document.addEventListener('DOMContentLoaded', () => {

  const apiKey = 'e5103872dfd9472df7a1fd116bcf67b8'; 

  document.getElementById('search-btn').addEventListener('click', handleCitySearch);
  document.getElementById('current-location-btn').addEventListener('click', getCurrentLocationWeather);

  function handleCitySearch() {
    const city = document.getElementById('city-input').value.trim(); // Get the city name from the input
    if (city) {
      fetchWeatherDataByCity(city); // Fetch weather data by city if the input is not empty
    } else {
      alert('Please enter a valid city name'); // Alert if the input is empty
    }
  }

  // Function to get weather data based on the user's current location
  function getCurrentLocationWeather() {
    if (navigator.geolocation) { // Check if geolocation is supported by the browser
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords; // Get latitude and longitude from the geolocation API
        fetchWeatherDataByCoords(latitude, longitude); // Fetch weather data by coordinates
      }, error => {
        alert('Error fetching location: ' + error.message); // Alert if there is an error fetching location
      });
    } else {
      alert('Geolocation is not supported by this browser.'); // Alert if geolocation is not supported
    }
  }

  // Function to fetch weather data by city name
  function fetchWeatherDataByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // API URL for fetching current weather data by city
    fetch(url)
      .then(response => {
        if (!response.ok) { // Check if the response is OK
          throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log('Current weather data:', data); // Log the received data
        if (data.cod === 200) { // Check if the response code is 200 (success)
          const { coord } = data; // Get coordinates from the response data
          fetchWeatherDataByCoords(coord.lat, coord.lon); // Fetch weather data by coordinates
        } else {
          alert(data.message); // Alert if the response code is not 200
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log the error
        alert('Failed to fetch weather data'); // Alert if there is an error fetching data
      });
  }

  // Function to fetch weather data by coordinates
  function fetchWeatherDataByCoords(lat, lon) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // API URL for fetching current weather data by coordinates
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // API URL for fetching forecast data by coordinates
    
    fetch(currentWeatherUrl)
      .then(response => {
        if (!response.ok) { // Check if the response is OK
          throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log('Current weather data:', data); // Log the received data
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error); // Log the error
        alert('Failed to fetch current weather data'); // Alert if there is an error fetching data
      });

      fetch(forecastUrl)
      .then(response => {
        if (!response.ok) { // Check if the response is OK
          throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log('Forecast data:', data); // Log the received data
      })
      .catch(error => {
        console.error('Error fetching forecast data:', error); // Log the error
        alert('Failed to fetch forecast data'); // Alert if there is an error fetching data
      });
  }
  
})



