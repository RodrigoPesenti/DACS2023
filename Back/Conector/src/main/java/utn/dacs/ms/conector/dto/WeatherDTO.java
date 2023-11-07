package utn.dacs.ms.conector.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherDTO {
    private double latitude;
    private double longitude;
    private double generationtime_ms;
    private long utc_offset_seconds;
    private String timezone;
    private String timezone_abbreviation;
    private double elevation;
    private CurrentUnits current_units;
    private Current current;

    // Getters and setters

    public class CurrentUnits {
        private String time;
        private String interval;
        private String temperature_2m;
        private String precipitation;
        private String rain;
        private String snowfall;
        private String weather_code;
        private String cloud_cover;
        private String wind_speed_10m;

        // Getters and setters
    }

    public class Current {
        private String time;
        private long interval;
        private double temperature_2m;
        private double precipitation;
        private double rain;
        private double snowfall;
        private int weather_code;
        private int cloud_cover;
        private double wind_speed_10m;

        // Getters and setters
    }
}

