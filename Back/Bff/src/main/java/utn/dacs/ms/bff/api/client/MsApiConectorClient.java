package utn.dacs.ms.bff.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.WeatherDTO;


@FeignClient(
			name = "msApiConectorClient", 
			url = "${feign.client.config.msApiConectorClient.url}"
			)

public interface MsApiConectorClient {

    @GetMapping("/ping")
    String ping();
    
    @GetMapping("/version")
    BuildInfoDTO version();
    
    @GetMapping("clima/{pLatitude}/{pLongitude}")
    public WeatherDTO clima(@PathVariable(value = "pLatitude") double pLatitude, @PathVariable(value = "pLongitude") double pLongitude);
      
}
