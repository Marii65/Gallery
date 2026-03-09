package com.Berry.Gallery.domain.repository;

import com.Berry.Gallery.domain.model.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {

}
