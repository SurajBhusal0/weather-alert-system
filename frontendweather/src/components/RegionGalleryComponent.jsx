import WeatherDisplayComponent from './WeatherDisplayComponent';
import './RegionGalleryComponent.css';

function RegionGalleryComponent({ readings, regionName }) {
  if (!readings || readings.length === 0) return null;

  return (
    <div className="region-gallery">
      <h3 className="region-title">{regionName} Region</h3>
      <div className="gallery-grid">
        {readings.map((reading) => (
          <WeatherDisplayComponent
            key={reading.id}
            reading={reading}
            mode="minimal"
          />
        ))}
      </div>
    </div>
  );
}

export default RegionGalleryComponent;
