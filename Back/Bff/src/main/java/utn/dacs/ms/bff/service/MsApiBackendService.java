package utn.dacs.ms.bff.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.bff.api.client.MsApiBackendClient;
import utn.dacs.ms.bff.api.client.MsApiConectorClient;
import utn.dacs.ms.bff.dto.BuildInfoDTO;
import utn.dacs.ms.bff.exceptions.BffException;
import utn.dacs.ms.bff.exceptions.ErrorEnum;

@Service
@Slf4j
public class MsApiBackendService {

	@Autowired
    private MsApiBackendClient msApiBackendClient;
	
    public String ping() {
        try {
            return this.msApiBackendClient.ping();
        } catch (Exception e) {
           log.error("Error producido al solicitar un recurso a /conector/ping", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }
    
    public BuildInfoDTO version() {
        try {
            return this.msApiBackendClient.version();
        } catch (Exception e) {
            log.error("Error producido al solicitar un recurso a /conector/version", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    }    
    

  
    

 
}
