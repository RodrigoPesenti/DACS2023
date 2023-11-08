package utn.dacs.ms.conector.api.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import utn.dacs.ms.conector.dto.WeatherDTO;


@FeignClient(
			name = "apiClient", 
			url = "${feign.client.config.apiClient.url}"
			)

public interface ApiClient {

    @GetMapping("")
    WeatherDTO clima(
    		@RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude
            );
    
    
}
