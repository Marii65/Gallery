package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.FavoritoOutputDTO;
import com.Berry.Gallery.domain.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;


    @GetMapping("/usuario/{usuarioId}")
    public List<FavoritoOutputDTO> listarPorUsuario(@PathVariable Long usuarioId) {
        return favoritoService.listarPorUsuario(usuarioId);
    }


    @GetMapping
    public List<FavoritoOutputDTO> listarTodos() {
        return favoritoService.listarTodos();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FavoritoOutputDTO adicionar(
            @RequestParam Long usuarioId,
            @RequestParam Long postId
    ) {
        return favoritoService.adicionar(usuarioId, postId);
    }


    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(
            @RequestParam Long usuarioId,
            @RequestParam Long postId
    ) {
        favoritoService.removerPorUsuarioEPost(usuarioId, postId);
    }
}