package com.denm.productos.modelo.entidad;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Categoria implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idCategoria;
	private String nombreCategoria;
	private String estado;
	
	@ToString.Exclude
	@OneToMany(mappedBy = "fkIdProduto", cascade = CascadeType.REFRESH)
	@JsonBackReference
	private List<Producto> listaProductos = new ArrayList<>();
	
}
