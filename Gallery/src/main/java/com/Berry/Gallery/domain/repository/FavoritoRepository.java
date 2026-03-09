package com.Berry.Gallery.domain.repository;



import com.Berry.Gallery.domain.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    boolean existsByUsuarioIdAndDesenhoId(Long usuarioId, Long desenhoId);
    void deleteByUsuarioIdAndDesenhoId(Long usuarioId, Long desenhoId);
}
