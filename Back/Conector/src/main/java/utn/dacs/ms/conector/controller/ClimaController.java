package utn.dacs.ms.conector.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.dacs.ms.conector.configuration.ApplicationContextProvider;
import utn.dacs.ms.conector.dto.WeatherDTO;
import utn.dacs.ms.conector.service.ApiService;

@RestController
@RequestMapping(value = "/clima")
public class ClimaController {
	
    @Autowired
    private ApiService apiService;
	
    @GetMapping("/{pLatitude}/{pLongitude}")
    public WeatherDTO clima(@PathVariable(value = "pLatitude") double pLatitude, @PathVariable(value = "pLongitude") double pLongitude) {
        return apiService.clima(pLatitude,pLongitude);
    }

}
