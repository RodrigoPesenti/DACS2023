package utn.dacs.ms.bff.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.UsuarioDto;
import utn.dacs.ms.bff.service.ActividadService;
import utn.dacs.ms.bff.service.ClimaService;
import utn.dacs.ms.bff.service.MsApiConectorService;
import utn.dacs.ms.bff.dto.WeatherDTO;

@RestController
@RequestMapping("/clima")
@Slf4j
public class ClimaController {

    @Autowired
    private ClimaService ClimaService;

    @GetMapping("/ping")
    public String ping() {
    	return "Test";
    }
    
    @GetMapping("/{pLatitude}/{pLongitude}")
    public WeatherDTO clima(@PathVariable(value = "pLatitude") double pLatitude, @PathVariable(value = "pLongitude") double pLongitude) {
        return ClimaService.clima(pLatitude,pLongitude);
    }
    
}
