package com.Berry.Gallery.domain.repository;

import com.Berry.Gallery.domain.model.Personagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonagemRepository extends JpaRepository<Personagem, Long> {
    List<Personagem> findByUsuarioId(Long usuarioId);
}