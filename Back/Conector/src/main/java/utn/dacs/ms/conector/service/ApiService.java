package utn.dacs.ms.conector.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import utn.dacs.ms.conector.api.client.ApiClient;
import utn.dacs.ms.conector.dto.WeatherDTO;
import utn.dacs.ms.conector.exceptions.BffException;
import utn.dacs.ms.conector.exceptions.ErrorEnum;

@Service
@Slf4j
public class ApiService {

	@Autowired
    private ApiClient apiClient;
	
	
    public WeatherDTO clima() {
        try {
            return this.apiClient.clima();
        } catch (Exception e) {
           log.error("Error producido al solicitar un recurso a /todos", e);
            throw new BffException(ErrorEnum.ERROR_API);
        }
    } 
}
