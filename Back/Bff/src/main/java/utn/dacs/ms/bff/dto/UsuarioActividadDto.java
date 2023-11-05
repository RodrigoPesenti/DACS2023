package utn.dacs.ms.bff.dto;

import lombok.Getter;
import lombok.Setter;
import utn.dacs.ms.bff.model.entity.Actividad;
import utn.dacs.ms.bff.model.entity.Usuario;

@Getter
@Setter


public class UsuarioActividadDto {

	private Long id;
	private Usuario usuario;
	private Actividad actividad;
}