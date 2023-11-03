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
import utn.dacs.ms.bff.service.MsApiConectorService;

@RestController
@RequestMapping("/actividad")
@Slf4j
public class ActividadController {

    @Autowired
    private ActividadService ActividadService;

    @GetMapping("")
    public ResponseEntity<List<ActividadDto>> getActividades(){
    	return ActividadService.getActividades();
    }
    
    
    
    /*
    @GetMapping("/reason")
    public List<ReasonDTO> getMotivos() {
    	return apiConectorService.getReason();
    }*/
   
}
