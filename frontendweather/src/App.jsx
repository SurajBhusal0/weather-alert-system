import { useState } from 'react';
import SearchComponent from './components/SearchComponent';
import WeatherDisplayComponent from './components/WeatherDisplayComponent';
import RegionGalleryComponent from './components/RegionGalleryComponent';
import { searchByCity, searchByRegion } from './services/weatherService';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [regionCities, setRegionCities] = useState([]);
  const [regionName, setRegionName] = useState('');
  const [searchMode, setSearchMode] = useState('city');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({ query, type }) => {
    setErrorMessage('');
    setSelectedCity(null);
    setRegionCities([]);
    setLoading(true);
    setSearchMode(type);

    try {
      if (type === 'city') {
        const results = await searchByCity(query);
        if (results.length === 0) {
          setErrorMessage('City Not Recorded');
          setLoading(false);
          return;
        }
        const city = results[0];
        setSelectedCity(city);
        setRegionName(city.region);

        const regionResults = await searchByRegion(city.region);
        setRegionCities(regionResults.filter((r) => r.id !== city.id));
      } else {
        const results = await searchByRegion(query);
        if (results.length === 0) {
          setErrorMessage('No cities found in this region.');
          setLoading(false);
          return;
        }
        setRegionName(results[0].region);
        setRegionCities(results);
      }
    } catch (err) {
      if (err.message === '404') {
        setErrorMessage('City Not Recorded');
      } else {
        setErrorMessage('An error occurred while fetching weather data.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <SearchComponent onSearch={handleSearch} />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {errorMessage && (
        <div className="error-alert">
          <span className="error-icon">⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {selectedCity && (
        <div className="results-section">
          <h2 className="section-title">Weather Details</h2>
          <div className="city-detail">
            <WeatherDisplayComponent reading={selectedCity} mode="full" />
          </div>

          {regionCities.length > 0 && (
            <RegionGalleryComponent
              readings={regionCities}
              regionName={regionName}
            />
          )}
        </div>
      )}

      {searchMode === 'region' && regionCities.length > 0 && !selectedCity && (
        <div className="results-section">
          <RegionGalleryComponent
            readings={regionCities}
            regionName={regionName}
          />
        </div>
      )}
    </div>
  );
}

export default App;
