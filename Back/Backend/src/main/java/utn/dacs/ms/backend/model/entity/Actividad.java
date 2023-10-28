package utn.dacs.ms.backend.model.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Actividad {
	
	@Id    
   @GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long id;
	private String nombre;
	private Float tempmin;
	private Float tempmax;
	private Float vientomin;
	private Float vientomax;
	private Float precipitacionmin;
	private Float precipitacionmax;
	
	@OneToMany(mappedBy="actividad")
	@JsonIgnore
    private List<UsuarioActividad> preferencias;
}
