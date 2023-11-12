package utn.dacs.ms.bff.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.dto.UsuarioActividadDto;
import utn.dacs.ms.bff.dto.UsuarioDto;
import utn.dacs.ms.bff.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@Slf4j
public class UsuarioController {

    @Autowired
    private UsuarioService UsuarioService;

    @GetMapping("/nombre/{nombreUsuario}/preferencias")
    public ResponseEntity<List<ActividadDto>> getPreferenciasByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario) {
    	return UsuarioService.getPreferenciasByNombre(nombreUsuario);
    }
    
    @GetMapping("/nombre/{nombreUsuario}")
	public ResponseEntity<UsuarioDto> getByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario) {
    	return UsuarioService.getByNombre(nombreUsuario);
    };
    
	@PostMapping("/usuarioActividad/{usuarioNombre}/{actividadNombre}")
	public ResponseEntity<UsuarioActividadDto> create(
	        @PathVariable(value = "usuarioNombre") String usuarioNombre,
	        @PathVariable(value = "actividadNombre") String actividadNombre) {
		return UsuarioService.create(usuarioNombre, actividadNombre); }
    
    @PostMapping("")
	public ResponseEntity<UsuarioDto> create(@RequestBody UsuarioDto usuarioDto) {
    	return UsuarioService.create(usuarioDto);
    };
  
    @DeleteMapping("/usuarioActividad/{usuarioNombre}/{actividadNombre}")
	public ResponseEntity<String> delete(
	        @PathVariable(value = "usuarioNombre") String usuarioNombre,
	        @PathVariable(value = "actividadNombre") String actividadNombre) {
    	return UsuarioService.delete(usuarioNombre, actividadNombre);
    }
   
}
