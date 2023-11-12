package utn.dacs.ms.bff.api.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import utn.dacs.ms.bff.dto.UsuarioDto;
import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.UsuarioActividadDto;


@FeignClient(
			name = "msApiBackendClient", 
			url = "${feign.client.config.msApiBackendClient.url}"
			)

public interface MsApiBackendClient {

    @GetMapping("/ping")
    String ping();
    
    @GetMapping("/version")
    BuildInfoDTO version();
    
    @GetMapping("/usuario/nombre/{nombreUsuario}/preferencias")
    ResponseEntity<List<ActividadDto>> getPreferenciasByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario);
    
    @GetMapping("/usuario/nombre/{nombreUsuario}")
	public ResponseEntity<UsuarioDto> getByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario);
    
    @GetMapping("/actividad")
    public ResponseEntity<List<ActividadDto>> getActividades();

    @PostMapping("/usuario/usuarioActividad/{usuarioNombre}/{actividadNombre}")
	ResponseEntity<UsuarioActividadDto> create(@PathVariable(value = "usuarioNombre") String usuarioNombre, @PathVariable(value = "actividadNombre") String actividadNombre);
    
    @PostMapping("/usuario/")
	public ResponseEntity<UsuarioDto> create(@RequestBody UsuarioDto usuarioDto);
    
    @DeleteMapping("/usuario/usuarioActividad/{usuarioNombre}/{actividadNombre}")
	public ResponseEntity<String> delete( @PathVariable(value = "usuarioNombre") String usuarioNombre, @PathVariable(value = "actividadNombre") String actividadNombre);
    
}
