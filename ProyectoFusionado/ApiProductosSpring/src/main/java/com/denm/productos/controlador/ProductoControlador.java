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
import com.denm.productos.modelo.entidad.Producto;
import com.denm.productos.servicio.ICategoriaServicio;
import com.denm.productos.servicio.IProductosServicio;

@RestController
@RequestMapping("api/producto")
public class ProductoControlador {
	
	@Autowired
	private IProductosServicio servicio;
	
	@Autowired
	private ICategoriaServicio servicioCategoria;
	
	@GetMapping
	public List<Producto> listarProducto(){
		return servicio.listarProducto();
	}
	
	@PostMapping
	public Producto insertarProducto(@RequestBody Producto producto) {
		if(producto.getFkIdProduto() !=null && producto.getFkIdProduto().getIdCategoria() > 0) {
			Categoria categoria = servicioCategoria.editarCategoria(
					      producto.getFkIdProduto().getIdCategoria());
			if(categoria != null) {
				producto.setFkIdProduto(categoria);
			}else {
				throw new RuntimeException(
						"LA CATEGORIA con Id:"+producto.getFkIdProduto().getIdCategoria()+
						" no existe");
			}
		}else {
			throw new RuntimeException("El rol es obligatorio");
		}
		return servicio.insertarProducto(producto);
	}
	
	@GetMapping("/{id}")
	public Producto editarProducto(@PathVariable int id) {
		return servicio.editarProducto(id);
	}
	
	@DeleteMapping("/{id}")
	public void eliminarProducto(@PathVariable int id) {
		servicio.eliminarProducto(id);
	}

}
