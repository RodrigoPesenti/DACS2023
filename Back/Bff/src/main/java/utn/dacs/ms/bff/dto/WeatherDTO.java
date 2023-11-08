package utn.dacs.ms.bff.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherDTO {

    private Daily daily;
   
    @Getter
    @Setter
    public class Daily {
        private String[] time;
        private double[] temperature_2m_max;
        private double[] temperature_2m_min;
        private double[] precipitation_sum;
        private double[] wind_speed_10m_max;

    }
}

