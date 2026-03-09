package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.FavoritoOutputDTO;
import com.Berry.Gallery.domain.exceptions.EntidadeNaoEncontradaException;
import com.Berry.Gallery.domain.model.Desenho;
import com.Berry.Gallery.domain.model.Favorito;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.DesenhoRepository;
import com.Berry.Gallery.domain.repository.FavoritoRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DesenhoRepository desenhoRepository;

    public List<FavoritoOutputDTO> listarPorUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<FavoritoOutputDTO> listarTodos() {
        return favoritoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public FavoritoOutputDTO adicionar(Long usuarioId, Long desenhoId) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Usuário não encontrado"
                        )
                );

        Desenho desenho = desenhoRepository.findById(desenhoId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                "Desenho não encontrado"
                        )
                );

        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setDesenho(desenho);

        return toDTO(favoritoRepository.save(favorito));
    }

    public void remover(Long favoritoId) {
        if (!favoritoRepository.existsById(favoritoId)) {
            throw new EntidadeNaoEncontradaException("Favorito não encontrado");
        }
        favoritoRepository.deleteById(favoritoId);
    }

    private FavoritoOutputDTO toDTO(Favorito favorito) {
        FavoritoOutputDTO dto = new FavoritoOutputDTO();
        dto.setId(favorito.getId());
        dto.setUsuarioId(favorito.getUsuario().getId());
        dto.setDesenhoId(favorito.getDesenho().getId());
        dto.setNomeDesenho(favorito.getDesenho().getTitulo()); // ajuste se o nome do campo for outro
        return dto;
    }
}
