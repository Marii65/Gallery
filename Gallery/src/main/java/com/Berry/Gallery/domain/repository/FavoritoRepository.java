package com.Berry.Gallery.domain.repository;

import com.Berry.Gallery.domain.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    Optional<Favorito> findByUsuarioIdAndPostId(Long usuarioId, Long postId);

    List<Favorito> findByUsuarioId(Long usuarioId);
}