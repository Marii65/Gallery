package com.Berry.Gallery.domain.repository;

import com.Berry.Gallery.domain.model.Estilo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstiloRepository extends JpaRepository<Estilo, Long> {
}