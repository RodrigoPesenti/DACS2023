package utn.dacs.ms.bff.model.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Usuario {
	

	private Long id;    
	private String nombre;   

	
	@JsonIgnore
    private List<UsuarioActividad> preferencias;
	
}
