package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.PostInputDTO;
import com.Berry.Gallery.api.dto.PostOutputDTO;
import com.Berry.Gallery.domain.model.Post;
import com.Berry.Gallery.domain.repository.PostRepository;
import com.Berry.Gallery.domain.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public Post criarPost(
            @RequestPart("data") String data,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Post post = mapper.readValue(data, Post.class);

        if (image != null && !image.isEmpty()) {
            post.setImagemUrl(image.getBytes()); // guarda o byte[] no banco
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

}