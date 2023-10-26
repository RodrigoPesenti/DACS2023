package utn.dacs.ms.backend.dto;

import java.util.List;

import lombok.Data;
import utn.dacs.ms.backend.model.entity.Usuario;

@Data
public class ActividadDto {

	private Long id;
	private String nombre;
	private Float tempmin;
	private Float tempmax;
	private Float vientomin;
	private Float vientomax;
	private Float precipitacionmin;
	private Float precipitacionmax;
	
	private List<Usuario> usuarios;
}
