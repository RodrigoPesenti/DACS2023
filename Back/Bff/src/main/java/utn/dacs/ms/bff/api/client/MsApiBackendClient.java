package utn.dacs.ms.bff.api.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

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
    
    
}
