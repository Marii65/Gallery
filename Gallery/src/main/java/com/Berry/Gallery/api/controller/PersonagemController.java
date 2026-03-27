package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.PersonagemInputDTO;
import com.Berry.Gallery.domain.model.Personagem;
import com.Berry.Gallery.domain.service.PersonagemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/personagens")
@CrossOrigin(origins = "*")
public class PersonagemController {

    @Autowired
    private PersonagemService personagemService;

    @GetMapping
    public List<Personagem> listar() {
        return personagemService.listarTodas();
    }
    @PostMapping
    public Personagem salvar(
            @RequestPart("dados") PersonagemInputDTO dto,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem
    ) {
        return personagemService.salvar(dto, imagem);
    }

    @GetMapping("/{id}")
    public Personagem buscar(@PathVariable Long id) {
        return personagemService.buscar(id);
    }

    @GetMapping("/usuarios/{userId}")
    public List<Personagem> listarPorUsuario(@PathVariable Long userId) {
        return personagemService.listarPorUsuario(userId);
    }

    @PutMapping("/{id}")
    public Personagem atualizar(@PathVariable Long id,
                                @RequestBody Personagem personagem) {
        return personagemService.atualizar(id, personagem);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id) {
        personagemService.excluir(id);
    }
}