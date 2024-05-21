document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('search-btn').addEventListener('click', handleCitySearch);

  function handleCitySearch() {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
      console.log(city);
    } else {
      alert('Please enter a valid city name');
    }
  }
})



