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
@RequestMapping(value = "/")
public class HomeController {
	
    @Autowired
    private ApiService apiService;
	
	
	@GetMapping(value = "/ping")
    public Object ping() {
        return "Hello from DACS MS CONECTOR ping";
    }

	@GetMapping(value = "/hola")
    public Object hola() {
        return "hola o/";
    }
	
	@GetMapping(value = "/version")
    public Object version() {
        return ApplicationContextProvider.getApplicationContext().getBean("buildInfo");
    }

}
