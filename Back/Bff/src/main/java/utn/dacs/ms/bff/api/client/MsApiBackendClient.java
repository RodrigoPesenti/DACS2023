package utn.dacs.ms.bff.api.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import utn.dacs.ms.bff.dto.ActividadDto;
import utn.dacs.ms.bff.dto.BuildInfoDTO;


@FeignClient(
			name = "msApiBackendClient", 
			url = "${feign.client.config.msApiBackendClient.url}"
			)

public interface MsApiBackendClient {

    @GetMapping("/ping")
    String ping();
    
    @GetMapping("/version")
    BuildInfoDTO version();
    
    @GetMapping("/nombre/{nombreUsuario}/preferencias")
    ResponseEntity<List<ActividadDto>> getPreferenciasByNombre(@PathVariable(value = "nombreUsuario") String nombreUsuario);
    
}
