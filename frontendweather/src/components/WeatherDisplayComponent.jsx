import { useState } from 'react';
import { getTemperatureTheme } from '../services/weatherService';
import './WeatherDisplayComponent.css';

function WeatherDisplayComponent({ reading, mode = 'full' }) {
  const [showFull, setShowFull] = useState(true);

  const themeClass = getTemperatureTheme(reading.temperature);
  const isCold = reading.temperature < 15;
  const displayMode = mode === 'minimal' ? 'minimal' : (showFull ? 'full' : 'minimal');

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className={`weather-card ${themeClass}`}>
      <div className="card-header">
        <span className="weather-icon">{isCold ? '❄️' : '☀️'}</span>
        <h2 className="city-name">{reading.cityName}</h2>
      </div>

      <div className="temperature">{reading.temperature}°C</div>

      {displayMode === 'full' && (
        <div className="details">
          <div className="detail-row">
            <span className="label">Region</span>
            <span className="value">{reading.region}</span>
          </div>
          <div className="detail-row">
            <span className="label">Latitude</span>
            <span className="value">{reading.latitude}</span>
          </div>
          <div className="detail-row">
            <span className="label">Longitude</span>
            <span className="value">{reading.longitude}</span>
          </div>
          <div className="detail-row">
            <span className="label">Recorded</span>
            <span className="value">{formatDate(reading.timestamp)}</span>
          </div>
        </div>
      )}

      {mode === 'full' && (
        <button className="toggle-btn" onClick={() => setShowFull(!showFull)}>
          {showFull ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

export default WeatherDisplayComponent;
