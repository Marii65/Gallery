package com.Berry.Gallery.domain.repository;

import com.Berry.Gallery.domain.model.Desenho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesenhoRepository extends JpaRepository<Desenho, Long> {

    @Query("""
        SELECT d FROM Desenho d
        WHERE (:estiloId IS NULL OR d.estilo.id = :estiloId)
          AND (:tecnicaId IS NULL OR d.tecnica.id = :tecnicaId)
          AND (:temaId IS NULL OR d.tema.id = :temaId)
          AND (:tipoId IS NULL OR d.tipo.id = :tipoId)
          AND (:personagemId IS NULL OR d.personagem.id = :personagemId)
          AND (:galeriaId IS NULL OR d.galeria.id = :galeriaId)
    """)
    List<Desenho> filtrar(
            Long estiloId,
            Long tecnicaId,
            Long temaId,
            Long tipoId,
            Long personagemId,
            Long galeriaId
    );

    List<Desenho> findByTituloContainingIgnoreCase(String titulo);
}