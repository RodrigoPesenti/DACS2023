package utn.dacs.ms.backend.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long>{

	Optional<Actividad> getByNombre(String nombre);
	
}

