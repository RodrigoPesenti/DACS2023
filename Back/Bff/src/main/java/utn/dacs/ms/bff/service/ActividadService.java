package utn.dacs.ms.bff.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.api.client.MsApiBackendClient;
import utn.dacs.ms.bff.api.client.MsApiConectorClient;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.dto.UsuarioDto;
import utn.dacs.ms.bff.exceptions.BffException;
import utn.dacs.ms.bff.exceptions.ErrorEnum;

@Service
@Slf4j
public class ActividadService {

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
    
    public ResponseEntity<List<ActividadDto>> getActividades(){
    	try {
            return this.msApiBackendClient.getActividades();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /backend/actividad", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    };
   

  
    

 
}
