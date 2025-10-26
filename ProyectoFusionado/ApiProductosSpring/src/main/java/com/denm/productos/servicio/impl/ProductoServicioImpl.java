package com.denm.productos.servicio.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.denm.productos.modelo.entidad.Producto;
import com.denm.productos.repositorio.IProductoRepositorio;
import com.denm.productos.servicio.IProductosServicio;

@Service
@Component
public class ProductoServicioImpl implements IProductosServicio{

	@Autowired
	private IProductoRepositorio repositorio;
	
	@Override
	public Producto insertarProducto(Producto producto) {
		// TODO Auto-generated method stub
		return repositorio.save(producto);
	}

	@Override
	public Producto editarProducto(int idProducto) {
		// TODO Auto-generated method stub
		return repositorio.findById(idProducto).get();
	}

	@Override
	public void eliminarProducto(int idProducto) {
		// TODO Auto-generated method stub
		repositorio.delete(editarProducto(idProducto));
	}

	@Override
	public List<Producto> listarProducto() {
		// TODO Auto-generated method stub
		return repositorio.findAll();
	}
	
	

}
