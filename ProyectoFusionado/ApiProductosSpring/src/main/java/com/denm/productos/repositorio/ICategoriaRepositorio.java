package com.denm.productos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.denm.productos.modelo.entidad.Categoria;

@Component
@Repository
public interface ICategoriaRepositorio extends JpaRepository<Categoria, Integer>{

}
