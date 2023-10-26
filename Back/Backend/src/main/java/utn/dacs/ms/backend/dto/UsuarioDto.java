package utn.dacs.ms.backend.dto;

import java.util.List;

import lombok.Data;
import utn.dacs.ms.backend.model.entity.Actividad;

@Data
public class UsuarioDto {

	private Long id;
	private String nombre;

	private List<Actividad> preferencias;
	
}
