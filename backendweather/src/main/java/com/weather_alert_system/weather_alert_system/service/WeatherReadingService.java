package com.weather_alert_system.weather_alert_system.service;

import com.weather_alert_system.weather_alert_system.dto.WeatherReadingDTO;
import com.weather_alert_system.weather_alert_system.exception.WeatherReadingNotFoundException;
import com.weather_alert_system.weather_alert_system.model.WeatherReading;
import com.weather_alert_system.weather_alert_system.repository.WeatherReadingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherReadingService {

    private final WeatherReadingRepository repository;

    public WeatherReadingService(WeatherReadingRepository repository) {
        this.repository = repository;
    }

    public WeatherReading create(WeatherReadingDTO dto) {
        WeatherReading reading = new WeatherReading();
        reading.setCityName(dto.getCityName());
        reading.setRegion(dto.getRegion());
        reading.setLatitude(dto.getLatitude());
        reading.setLongitude(dto.getLongitude());
        reading.setTemperature(dto.getTemperature());
        reading.setTimestamp(dto.getTimestamp());
        return repository.save(reading);
    }

    public List<WeatherReading> getAll(String cityName, String region) {
        if (cityName != null && region != null) {
            return repository.findByCityNameIgnoreCaseAndRegionIgnoreCase(cityName, region);
        }
        if (cityName != null) {
            return repository.findByCityNameIgnoreCase(cityName);
        }
        if (region != null) {
            return repository.findByRegionIgnoreCase(region);
        }
        return repository.findAll();
    }

    public WeatherReading getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new WeatherReadingNotFoundException(id));
    }
}
