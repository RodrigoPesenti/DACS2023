package utn.dacs.ms.bff.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.service.MsApiBackendService;
import utn.dacs.ms.bff.service.MsApiConectorService;

@RestController
@RequestMapping("/backend")
@Slf4j
public class MsBackendController {

    @Autowired
    private MsApiBackendService apiBackendService;

    @GetMapping("/ping")
    public String ping() {
        return apiBackendService.ping();
    }
    
    @GetMapping("/version")
    public BuildInfoDTO getPropuestas() {
        return apiBackendService.version();
    }

    /*
    @GetMapping("/reason")
    public List<ReasonDTO> getMotivos() {
    	return apiConectorService.getReason();
    }*/
   
}
