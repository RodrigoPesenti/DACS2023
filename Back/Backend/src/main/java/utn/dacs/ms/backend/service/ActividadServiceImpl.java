package utn.dacs.ms.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.repository.ActividadRepository;

@Service
public class ActividadServiceImpl implements ActividadService {

	@Autowired
	private ActividadRepository actividadRepository;

	@Override
	public Optional<Actividad> getById(Long id) {
		return actividadRepository.findById(id);
	}

	@Override
	public Optional<Actividad> getByNombre(String nombre) {
        return actividadRepository.getByNombre(nombre);
    }
		
	
	@Override
	public List<Actividad> getAll() {
		return actividadRepository.findAll();
	}

	@Override
	public void delete(Long id) {
		Optional<Actividad> actividad = getById(id);
		actividadRepository.delete(actividad.get());
	}

	@Override
	public Actividad save(Actividad entity) {
		return actividadRepository.save(entity);
	}

	@Override
	public List<Actividad> find(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Actividad getBy(Map<String, Object> filter) {
		throw new UnsupportedOperationException();
	}

	@Override
	public Boolean existById(Long id) {
		return actividadRepository.existsById(id);
	}
}
