package utn.dacs.ms.bff.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.api.client.MsApiBackendClient;
import utn.dacs.ms.bff.api.client.MsApiConectorClient;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.UsuarioActividadDto;
import utn.dacs.ms.bff.dto.UsuarioDto;
import utn.dacs.ms.bff.exceptions.BffException;
import utn.dacs.ms.bff.exceptions.ErrorEnum;

@Service
@Slf4j
public class UsuarioService {

	@Autowired
    private MsApiBackendClient msApiBackendClient;
	
    public String ping() {
        try {
            return this.msApiBackendClient.ping();
        } catch (Exception e) {
           log.error("Error producido al solicitar un recurso a /backend/ping", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    public BuildInfoDTO version() {
        try {
            return this.msApiBackendClient.version();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/version", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }    
    
    public ResponseEntity<List<ActividadDto>> getPreferenciasByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario) {
    	try {
            return this.msApiBackendClient.getPreferenciasByNombre(nombreUsuario);
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/usuario/nombre/{nombreUsuario}/preferencias", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    };
    
    
	public ResponseEntity<UsuarioDto> getByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario) {
		try {
            return this.msApiBackendClient.getByNombre(nombreUsuario);
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/usuario/nombre/{nombreUsuario}", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
	};

	public ResponseEntity<UsuarioActividadDto> create(String usuarioNombre, String actividadNombre) {
		try {
            return this.msApiBackendClient.create(usuarioNombre, actividadNombre);
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a create", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
	};

	
	public ResponseEntity<UsuarioDto> create(@RequestBody UsuarioDto usuarioDto) {
		try {
            return this.msApiBackendClient.create(usuarioDto);
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a create", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
	}
    
	public ResponseEntity<String> delete( @PathVariable(value = "usuarioNombre") String usuarioNombre, @PathVariable(value = "actividadNombre") String actividadNombre){
		try {
            return this.msApiBackendClient.delete(usuarioNombre, actividadNombre);
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a create", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
	};
 
}
