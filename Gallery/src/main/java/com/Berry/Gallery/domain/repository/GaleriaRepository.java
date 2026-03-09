package com.Berry.Gallery.domain.repository;


import com.Berry.Gallery.domain.model.Galeria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GaleriaRepository extends JpaRepository<Galeria, Long> {

    List<Galeria> findByUsuarioId(Long usuarioId);
}

