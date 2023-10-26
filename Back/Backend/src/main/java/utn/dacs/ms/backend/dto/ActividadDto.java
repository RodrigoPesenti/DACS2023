package utn.dacs.ms.backend.dto;

import lombok.Data;

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
}
