package utn.dacs.ms.backend.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import utn.dacs.ms.backend.dto.ActividadDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.Actividad;
import utn.dacs.ms.backend.service.ActividadService;

@RestController
@RequestMapping(value = "/actividad")
public class ActividadController {

	@Autowired
	private ActividadService actividadService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("")
	public ResponseEntity<List<ActividadDto>> getAll() {
		List<Actividad> actividades = actividadService.getAll();
		List<ActividadDto> data = actividades.stream().map(actividad -> modelMapper.map(actividad, ActividadDto.class))
				.collect(Collectors.toList());
		return new ResponseEntity<List<ActividadDto>>(data, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ActividadDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		Optional<Actividad> actividad = actividadService.getById(id);

		if (actividad.isEmpty()) {
			throw new ResourceNotFoundException("");
		}
		ActividadDto data = modelMapper.map(actividad.get(), ActividadDto.class);
		return new ResponseEntity<ActividadDto>(data, HttpStatus.OK);
	}

	@PostMapping("")
	public ResponseEntity<ActividadDto> create(@RequestBody ActividadDto actividadDto) {
		Actividad actividad = modelMapper.map(actividadDto, Actividad.class);
		ActividadDto data = modelMapper.map(actividadService.save(actividad), ActividadDto.class);
		return new ResponseEntity<ActividadDto>(data, HttpStatus.OK);
	}

	@PutMapping("")
	public ResponseEntity<ActividadDto> update(@RequestBody ActividadDto actividadDto) throws ResourceNotFoundException {

		if (actividadDto.getId() == null || !actividadService.existById(actividadDto.getId())) {
			throw a ResourceNotFoundException("");
		}

		Actividad actividad = modelMapper.map(actividadDto, Actividad.class);
		ActividadDto data = modelMapper.map(actividadService.save(actividad), ActividadDto.class);
		return new ResponseEntity<ActividadDto>(data, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

		if (id == null || !actividadService.existById(id)) {
			throw new ResourceNotFoundException("");
		}

		actividadService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
