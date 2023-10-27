package utn.dacs.ms.backend.dto;

import lombok.Getter;
import lombok.Setter;
import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.model.entity.Usuario;

@Getter
@Setter
public class UsuarioActividadDto {

	private Long id;
	private Usuario usuario;
	private Actividad actividad;
}
