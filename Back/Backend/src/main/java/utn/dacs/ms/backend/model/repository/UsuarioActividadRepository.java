package utn.dacs.ms.backend.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.entity.UsuarioActividad;

@Repository
public interface UsuarioActividadRepository extends JpaRepository<UsuarioActividad, Long>{

	Optional<UsuarioActividad> findByUsuarioAndActividad(Usuario usuario, Actividad actividad);
	
}
