package utn.dacs.ms.bff.model.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioActividad {
	

	private Long id;	
    private Usuario usuario;
	private Actividad actividad;
	
}
