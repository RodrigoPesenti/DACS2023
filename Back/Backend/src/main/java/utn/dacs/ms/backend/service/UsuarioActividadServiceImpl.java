package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.entity.UsuarioActividad;
import utn.dacs.ms.backend.model.repository.UsuarioActividadRepository;

@Service
public class UsuarioActividadServiceImpl implements UsuarioActividadService {

	@Autowired
	private UsuarioActividadRepository usuarioActividadRepository;

	@Override
	public Optional<UsuarioActividad> getById(Long id) {
		return usuarioActividadRepository.findById(id);
	}

	@Override
	public List<UsuarioActividad> getAll() {
		return usuarioActividadRepository.findAll();
	}

	
	@Override
	public void delete(Long id) {
		Optional<UsuarioActividad> usuario = getById(id);
		usuarioActividadRepository.delete(usuario.get());
	}

	@Override
	public UsuarioActividad save(UsuarioActividad entity) {
		return usuarioActividadRepository.save(entity);
	}

	@Override
	public List<UsuarioActividad> find(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public UsuarioActividad getBy(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Boolean existById(Long id) {
		return usuarioActividadRepository.existsById(id);
	}
	
}
