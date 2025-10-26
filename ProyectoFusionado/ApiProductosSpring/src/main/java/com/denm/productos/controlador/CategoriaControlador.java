package com.denm.productos.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.denm.productos.modelo.entidad.Categoria;
import com.denm.productos.servicio.ICategoriaServicio;

@RestController
@RequestMapping("api/categoria")
public class CategoriaControlador {
	
	@Autowired
	private ICategoriaServicio servicio;
	
	@GetMapping
	public List<Categoria> listarCategoria(){
		return servicio.listarCategoria();
	}
	
	@PostMapping
	public Categoria insertarRoles(@RequestBody Categoria categoria) {
		return servicio.insertarCategoria(categoria);
	}
	
	@GetMapping("/{id}")
	public Categoria editarCategoria(@PathVariable int id) {
		return servicio.editarCategoria(id);
	}
	
	@DeleteMapping("/{id}")
	public void eliminarCategoria(@PathVariable int id) {
		servicio.eliminarCategoria(id);
	}

}
