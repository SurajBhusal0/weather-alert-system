package com.weather_alert_system.weather_alert_system.exception;

public class WeatherReadingNotFoundException extends RuntimeException {

    public WeatherReadingNotFoundException(Long id) {
        super("Weather reading not found with id: " + id);
    }
}
