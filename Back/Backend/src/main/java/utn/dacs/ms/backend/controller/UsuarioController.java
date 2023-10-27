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
import utn.dacs.ms.backend.dto.UsuarioDto;
import utn.dacs.ms.backend.exceptions.ResourceNotFoundException;
import utn.dacs.ms.backend.model.entity.Usuario;
import utn.dacs.ms.backend.model.entity.UsuarioActividad;
import utn.dacs.ms.backend.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("")
	public ResponseEntity<List<UsuarioDto>> getAll() {
		List<Usuario> usuarios = usuarioService.getAll();
		List<UsuarioDto> data = usuarios.stream().map(usuario -> modelMapper.map(usuario, UsuarioDto.class))
				.collect(Collectors.toList());
		return new ResponseEntity<List<UsuarioDto>>(data, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDto> getById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		Optional<Usuario> usuario = usuarioService.getById(id);

		if (usuario.isEmpty()) {
			throw new ResourceNotFoundException("");
		}
		UsuarioDto data = modelMapper.map(usuario.get(), UsuarioDto.class);
		return new ResponseEntity<UsuarioDto>(data, HttpStatus.OK);
	}

	@GetMapping("/{id}/preferencias")
    public ResponseEntity<List<ActividadDto>> getPreferenciasByUsuarioId(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuarioOptional = usuarioService.getById(id);

        if (usuarioOptional.isEmpty()) {
            throw new ResourceNotFoundException("Usuario not found");
        }

        Usuario usuario = usuarioOptional.get();
        List<UsuarioActividad> preferencias = usuario.getPreferencias();
		List<ActividadDto> data = preferencias.stream().map(preferencia -> modelMapper.map(preferencia.getActividad(), ActividadDto.class))
				.collect(Collectors.toList());
		return new ResponseEntity<List<ActividadDto>>(data, HttpStatus.OK);
    }
	
	@PostMapping("")
	public ResponseEntity<UsuarioDto> create(@RequestBody UsuarioDto usuarioDto) {
		Usuario usuario = modelMapper.map(usuarioDto, Usuario.class);
		UsuarioDto data = modelMapper.map(usuarioService.save(usuario), UsuarioDto.class);
		return new ResponseEntity<UsuarioDto>(data, HttpStatus.OK);
	}

	@PutMapping("")
	public ResponseEntity<UsuarioDto> update(@RequestBody UsuarioDto usuarioDto) throws ResourceNotFoundException {

		if (usuarioDto.getId() == null || !usuarioService.existById(usuarioDto.getId())) {
			throw new ResourceNotFoundException("");
		}

		Usuario usuario = modelMapper.map(usuarioDto, Usuario.class);
		UsuarioDto data = modelMapper.map(usuarioService.save(usuario), UsuarioDto.class);
		return new ResponseEntity<UsuarioDto>(data, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {

		if (id == null || !usuarioService.existById(id)) {
			throw new ResourceNotFoundException("");
		}

		usuarioService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
