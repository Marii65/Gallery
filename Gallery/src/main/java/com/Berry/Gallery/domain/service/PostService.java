package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.PostInputDTO;
import com.Berry.Gallery.api.dto.PostOutputDTO;
import com.Berry.Gallery.domain.model.Galeria;
import com.Berry.Gallery.domain.model.Post;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.GaleriaRepository;
import com.Berry.Gallery.domain.repository.PostRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Transactional
    public PostOutputDTO salvar(PostInputDTO dto) {
        // Busca as entidades relacionadas
        Usuario usuario = usuarioRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Galeria galeria = galeriaRepository.findById(dto.getGalleryId())
                .orElseThrow(() -> new RuntimeException("Galeria não encontrada"));

        // Mapeia DTO para Entity
        Post post = new Post();
        post.setArtistName(dto.getArtistName());
        post.setTitle(dto.getTitle());
        post.setCreationDate(dto.getCreationDate());
        post.setTecnica(dto.getTecnica());
        post.setType(dto.getType());
        post.setStyle(dto.getStyle());
        post.setTheme(dto.getTheme());
        post.setCharacterType(dto.getCharacterType());
        post.setCharacterName(dto.getCharacterName());
        post.setDescription(dto.getDescription());
        post.setUsuario(usuario);
        post.setGaleria(galeria);

        // Salva e converte para OutputDTO
        Post postSalvo = postRepository.save(post);
        return toOutputDTO(postSalvo);
    }

    public List<PostOutputDTO> listarPorUsuario(Long userId) {
        return postRepository.findByUsuarioIdOrderByCreationDateDesc(userId)
                .stream()
                .map(this::toOutputDTO)
                .toList();
    }

    private PostOutputDTO toOutputDTO(Post post) {
        PostOutputDTO dto = new PostOutputDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        // dto.setImageUrl(post.getImageUrl()); // Ative quando tiver lógica de imagem
        return dto;
    }
}