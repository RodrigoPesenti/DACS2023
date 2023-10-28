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
public class Usuario {
	
	@Id    
   @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;    
	private String nombre;   

	@OneToMany(mappedBy="usuario")
	@JsonIgnore
    private List<UsuarioActividad> preferencias;
	
}
