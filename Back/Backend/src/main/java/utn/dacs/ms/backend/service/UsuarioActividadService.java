package utn.dacs.ms.backend.service;

import java.util.Optional;

import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.entity.UsuarioActividad;

public interface UsuarioActividadService extends CommonService<UsuarioActividad>{

	public Optional<UsuarioActividad> getByUsuarioAndActividad(Usuario usuario, Actividad actividad);
	
	public void deleteByUsuarioActividad(UsuarioActividad usuarioActividad);
	
}
