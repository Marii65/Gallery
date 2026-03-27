package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.PostInputDTO;
import com.Berry.Gallery.api.dto.PostOutputDTO;
import com.Berry.Gallery.domain.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PostOutputDTO adicionar(@RequestBody PostInputDTO dto) {
        return postService.salvar(dto);
    }
}