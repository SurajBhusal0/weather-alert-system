package com.weather_alert_system.weather_alert_system.repository;

import com.weather_alert_system.weather_alert_system.model.WeatherReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeatherReadingRepository extends JpaRepository<WeatherReading, Long> {

    List<WeatherReading> findByCityNameIgnoreCase(String cityName);

    List<WeatherReading> findByRegionIgnoreCase(String region);

    List<WeatherReading> findByCityNameIgnoreCaseAndRegionIgnoreCase(String cityName, String region);
}
