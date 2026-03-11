import { useState } from 'react';
import './SearchComponent.css';

function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('city');

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch({ query: trimmed, type: searchType });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <h1 className="search-title">City Weather Portal</h1>
      <p className="search-subtitle">Search for weather data by city name or region</p>

      <div className="search-toggle">
        <button
          className={searchType === 'city' ? 'active' : ''}
          onClick={() => setSearchType('city')}
        >
          City
        </button>
        <button
          className={searchType === 'region' ? 'active' : ''}
          onClick={() => setSearchType('region')}
        >
          Region
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={searchType === 'city' ? 'Enter city name...' : 'Enter region name...'}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchComponent;
