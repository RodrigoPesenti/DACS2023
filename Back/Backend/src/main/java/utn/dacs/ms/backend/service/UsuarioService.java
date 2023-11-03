package utn.dacs.ms.backend.service;

import java.util.Optional;

import utn.dacs.ms.backend.model.entity.Usuario;

public interface UsuarioService extends CommonService<Usuario>{
	
	public Optional<Usuario> getByNombre(String nombre);
	
}
