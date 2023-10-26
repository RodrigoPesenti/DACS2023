package utn.dacs.ms.backend.model.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

import lombok.Data;

@Data
@Entity
public class Usuario {
	
	@Id    
   @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;    
	private String nombre;   

	@JsonIgnore
	@ManyToMany
    @JoinTable(name = "usuario_actividad",
               joinColumns = @JoinColumn(name = "usuario_id"),
               inverseJoinColumns = @JoinColumn(name = "actividad_id"))
    private List<Actividad> preferencias;
	
}
