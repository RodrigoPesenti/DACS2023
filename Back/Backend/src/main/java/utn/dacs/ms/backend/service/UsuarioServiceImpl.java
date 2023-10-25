package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public Optional<Usuario> getById(Long id) {
		return usuarioRepository.findById(id);
	}

	@Override
	public List<Usuario> getAll() {
		return usuarioRepository.findAll();
	}

	
	
	@Override
	public void delete(Long id) {
		Optional<Usuario> usuario = getById(id);
		usuarioRepository.delete(usuario.get());
	}

	@Override
	public Usuario save(Usuario entity) {
		return usuarioRepository.save(entity);
	}

	@Override
	public List<Usuario> find(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Usuario getBy(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Boolean existById(Long id) {
		return usuarioRepository.existsById(id);
	}
	
}
