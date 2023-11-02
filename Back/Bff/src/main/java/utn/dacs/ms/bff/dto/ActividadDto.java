package utn.dacs.ms.bff.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActividadDto {

	private Long id;
	private String nombre;
	private Float tempmin;
	private Float tempmax;
	private Float vientomin;
	private Float vientomax;
	private Float precipitacionmin;
	private Float precipitacionmax;
	
}
