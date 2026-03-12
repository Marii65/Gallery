package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.UsuarioInputDTO;
import com.Berry.Gallery.api.dto.UsuarioOutputDTO;
import com.Berry.Gallery.api.dto.LoginDTO;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import com.Berry.Gallery.domain.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @GetMapping
    public List<UsuarioOutputDTO> listar() {
        return usuarioService.listar();
    }


    @GetMapping("/{usuarioId}")
    public UsuarioOutputDTO buscar(@PathVariable Long usuarioId) {
        return usuarioService.buscar(usuarioId);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioOutputDTO adicionar(@RequestBody UsuarioInputDTO dto) {
        return usuarioService.salvar(dto);
    }

    @PostMapping("/login")
    public UsuarioOutputDTO login(@RequestBody LoginDTO login){
        return usuarioService.login(login);
    }


    @PutMapping("/{usuarioId}")
    public UsuarioOutputDTO atualizar(
            @PathVariable Long usuarioId,
            @RequestBody UsuarioInputDTO dto) {
        return usuarioService.atualizar(usuarioId, dto);
    }

    @DeleteMapping("/{usuarioId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long usuarioId) {
        usuarioService.excluir(usuarioId);
    }

    @GetMapping("/artistas")
    public List<UsuarioOutputDTO> listarArtistas() {
        return usuarioService.listarArtistas();
    }

    @PutMapping("/perfil/{id}")
    public ResponseEntity<Usuario> atualizarPerfil(
            @PathVariable Long id,
            @RequestBody Usuario dados) {

        Usuario usuario = usuarioRepository
                .findById(id)
                .orElseThrow();

        usuario.setNome(dados.getNome());
        usuario.setDescricao(dados.getDescricao());

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(usuario);
    }


}
