package com.weather_alert_system.weather_alert_system.controller;

import com.weather_alert_system.weather_alert_system.dto.WeatherReadingDTO;
import com.weather_alert_system.weather_alert_system.model.WeatherReading;
import com.weather_alert_system.weather_alert_system.service.WeatherReadingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/weather")
public class WeatherController {

    private final WeatherReadingService service;

    public WeatherController(WeatherReadingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<WeatherReading> create(@Valid @RequestBody WeatherReadingDTO dto) {
        WeatherReading created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<WeatherReading>> getAll(
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) String region) {
        return ResponseEntity.ok(service.getAll(cityName, region));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeatherReading> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNotAllowed(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(Map.of("error", "DELETE method is not allowed"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> putNotAllowed(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(Map.of("error", "PUT method is not allowed"));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Map<String, String>> patchNotAllowed(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(Map.of("error", "PATCH method is not allowed"));
    }
}
