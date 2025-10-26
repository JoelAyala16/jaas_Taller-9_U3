package com.denm.productos.servicio;

import java.util.List;

import com.denm.productos.modelo.entidad.Producto;

public interface IProductosServicio {
	
	public Producto insertarProducto(Producto producto);
	public Producto editarProducto(int idProducto);
	public void eliminarProducto(int idProducto);
	public List<Producto>listarProducto();

}
