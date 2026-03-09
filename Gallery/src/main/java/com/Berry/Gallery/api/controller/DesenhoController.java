package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.domain.model.Desenho;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.DesenhoRepository;
import com.Berry.Gallery.domain.service.DesenhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/desenhos")
@CrossOrigin(origins = "*")
public class DesenhoController {
    @Autowired
    private DesenhoService desenhoService;


    @GetMapping
    public List<Desenho> listar() {
        return desenhoService.listar();
    }
    @GetMapping("/ordenar")
    public List<Desenho> ordenarPorData(
            @RequestParam(defaultValue = "desc") String direcao
    ) {
        return desenhoService.listarOrdenadoPorData(direcao);
    }


    @GetMapping("/{desenhoId}")
    public Desenho buscar(@PathVariable Long desenhoId) {
        return desenhoService.buscar(desenhoId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Desenho adicionar(@RequestBody Desenho desenho, Authentication authentication) {

        Usuario artista = (Usuario) authentication.getPrincipal();

        desenho.setArtista(artista);

        return desenhoService.salvar(desenho);
    }

    @PutMapping("/{desenhoId}")
    public Desenho atualizar(
            @PathVariable Long desenhoId,
            @RequestBody Desenho desenho
    ) {
        Desenho desenhoAtual = desenhoService.buscar(desenhoId);

        desenhoAtual.setTitulo(desenho.getTitulo());
        desenhoAtual.setDescricao(desenho.getDescricao());
        desenhoAtual.setImagemUrl(desenho.getImagemUrl());
        desenhoAtual.setArtista(desenho.getArtista());
        desenhoAtual.setDataCriacao(desenho.getDataCriacao());
        desenhoAtual.setNome_personagem(desenho.getNome_personagem());

        desenhoAtual.setEstilo(desenho.getEstilo());
        desenhoAtual.setTecnica(desenho.getTecnica());
        desenhoAtual.setTema(desenho.getTema());
        desenhoAtual.setTipo(desenho.getTipo());
        desenhoAtual.setPersonagem(desenho.getPersonagem());
        desenhoAtual.setGaleria(desenho.getGaleria());

        return desenhoService.salvar(desenhoAtual);
    }

    @DeleteMapping("/{desenhoId}")
    public void remover(@PathVariable Long desenhoId, Authentication auth) {

        Usuario usuario = (Usuario) auth.getPrincipal();

        Desenho desenho = desenhoService.buscar(desenhoId);

        if(!desenho.getArtista().getId().equals(usuario.getId())){
            throw new RuntimeException("Você não pode excluir este desenho");
        }

        desenhoService.excluir(desenhoId);
    }

    @GetMapping("/filtro")
    public List<Desenho> filtrar(
            @RequestParam(required = false) Long estiloId,
            @RequestParam(required = false) Long tecnicaId,
            @RequestParam(required = false) Long temaId,
            @RequestParam(required = false) Long tipoId,
            @RequestParam(required = false) Long personagemId,
            @RequestParam(required = false) Long galeriaId
    ) {
        return desenhoService.filtrar(
                estiloId,
                tecnicaId,
                temaId,
                tipoId,
                personagemId,
                galeriaId
        );
    }
}
