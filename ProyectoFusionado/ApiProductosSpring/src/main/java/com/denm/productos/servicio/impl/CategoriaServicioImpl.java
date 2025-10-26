package com.denm.productos.servicio.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.denm.productos.modelo.entidad.Categoria;
import com.denm.productos.repositorio.ICategoriaRepositorio;
import com.denm.productos.servicio.ICategoriaServicio;

@Service
@Component
public class CategoriaServicioImpl implements ICategoriaServicio{
	
	@Autowired
	private ICategoriaRepositorio repositorio;

	@Override
	public Categoria insertarCategoria(Categoria categoria) {
		// TODO Auto-generated method stub
		return repositorio.save(categoria);
	}

	@Override
	public Categoria editarCategoria(int idCategoria) {
		// TODO Auto-generated method stub
		return repositorio.findById(idCategoria).get();
	}

	@Override
	public void eliminarCategoria(int idCategoria) {
		// TODO Auto-generated method stub
		repositorio.delete(editarCategoria(idCategoria));
		
	}

	@Override
	public List<Categoria> listarCategoria() {
		// TODO Auto-generated method stub
		return repositorio.findAll();
	}
	
	

}
