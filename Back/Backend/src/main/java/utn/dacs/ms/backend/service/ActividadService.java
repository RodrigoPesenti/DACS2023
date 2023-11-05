package utn.dacs.ms.backend.service;

import java.util.Optional;

import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;

public interface ActividadService extends CommonService<Actividad>{
	
	public Optional<Actividad> getByNombre(String nombre);

}
