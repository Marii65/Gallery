package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.PostInputDTO;
import com.Berry.Gallery.api.dto.PostOutputDTO;
import com.Berry.Gallery.domain.model.Galeria;
import com.Berry.Gallery.domain.model.Post;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.GaleriaRepository;
import com.Berry.Gallery.domain.repository.PostRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import com.Berry.Gallery.domain.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    private final PostRepository postRepository;
    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ObjectMapper mapper;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public Post criarPost(
            @RequestPart("data") String data,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {

        Map<String, Object> map = mapper.readValue(data, Map.class);

        String galleryIdStr = map.get("galleryId") != null ? map.get("galleryId").toString() : null;
        String userIdStr = map.get("userId") != null ? map.get("userId").toString() : null;


        if (userIdStr == null || userIdStr.isBlank()) {
            throw new RuntimeException("userId não enviado");
        }

        Long userId = Long.valueOf(userIdStr);
        Usuario usuario = usuarioRepository.findById(userId).orElseThrow();


        Galeria galeria = null;

        if (galleryIdStr != null && !galleryIdStr.isBlank()) {
            Long galleryId = Long.valueOf(galleryIdStr);
            galeria = galeriaRepository.findById(galleryId).orElseThrow();
        }

        Post post = mapper.convertValue(map, Post.class);

        post.setUsuario(usuario);
        post.setGaleria(galeria); // pode ser null


        post.setCreationDate(LocalDate.now());

        if (image != null && !image.isEmpty()) {
            post.setImagemUrl(image.getBytes());
        }

        return postRepository.save(post);
    }

    @GetMapping("/{id}/imagemUrl")
    public ResponseEntity<byte[]> getImagemUrl(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        if (post.getImagemUrl() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg")
                .body(post.getImagemUrl());
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUser(@PathVariable Long userId) {
        return postRepository.findByUsuarioIdOrderByCreationDateDesc(userId);
    }

    @GetMapping("/{id}")
    public Post buscar(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}/like")
    public Post likePost(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        return postRepository.save(post);
    }





}