package com.denm.productos.servicio;

import java.util.List;

import com.denm.productos.modelo.entidad.Categoria;

public interface ICategoriaServicio {
	
	public Categoria insertarCategoria(Categoria categoria);
	public Categoria editarCategoria(int idCategoria);
	public void eliminarCategoria(int idCategoria);
	public List<Categoria>listarCategoria();
	

}
