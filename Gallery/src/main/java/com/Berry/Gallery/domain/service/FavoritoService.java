package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.FavoritoOutputDTO;
import com.Berry.Gallery.domain.model.Favorito;
import com.Berry.Gallery.domain.model.Post;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.FavoritoRepository;
import com.Berry.Gallery.domain.repository.PostRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PostRepository postRepository;

    public FavoritoOutputDTO adicionar(Long usuarioId, Long postId) {
        var existente = favoritoRepository.findByUsuarioIdAndPostId(usuarioId, postId);

        if (existente.isPresent()) {
            return new FavoritoOutputDTO(existente.get());
        }

        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();

        Favorito favorito = new Favorito();
        favorito.setUsuario(usuario);
        favorito.setPost(post);

        favoritoRepository.save(favorito);

        return new FavoritoOutputDTO(favorito);
    }


    public void removerPorUsuarioEPost(Long usuarioId, Long postId) {
        Favorito favorito = favoritoRepository
                .findByUsuarioIdAndPostId(usuarioId, postId)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado"));

        favoritoRepository.delete(favorito);
    }

    public List<FavoritoOutputDTO> listarPorUsuario(Long usuarioId) {
        return favoritoRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(FavoritoOutputDTO::new)
                .collect(Collectors.toList());
    }

    public List<FavoritoOutputDTO> listarTodos() {
        return favoritoRepository.findAll()
                .stream()
                .map(FavoritoOutputDTO::new)
                .collect(Collectors.toList());
    }
}