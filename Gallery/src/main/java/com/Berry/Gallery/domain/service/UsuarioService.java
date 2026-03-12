package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.UsuarioInputDTO;
import com.Berry.Gallery.api.dto.UsuarioOutputDTO;
import com.Berry.Gallery.domain.exceptions.EntidadeNaoEncontradaException;
import com.Berry.Gallery.domain.exceptions.EmailJaCadastradoException;
import com.Berry.Gallery.domain.exceptions.UserJaCadastradoException;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.api.dto.LoginDTO;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public List<UsuarioOutputDTO> listar() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toOutputDTO)
                .toList();
    }


    public UsuarioOutputDTO buscar(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                String.format("Usuário de id %d não encontrado", usuarioId)
                        )
                );

        return toOutputDTO(usuario);
    }

    public UsuarioOutputDTO salvar(UsuarioInputDTO dto) {

        if(usuarioRepository.existsByEmail(dto.getEmail())){
            throw new EmailJaCadastradoException("Email já está cadastrado.");
        }

        if(usuarioRepository.existsByNome(dto.getNome())){
            throw new UserJaCadastradoException("Username já está cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        usuario.setFotoUrl(dto.getFotoUrl());

        if (dto.getRole() != null) {
            String roleNome = dto.getRole().toUpperCase().trim();
            usuario.setRole(Usuario.Role.valueOf(roleNome));
        } else {
            usuario.setRole(Usuario.Role.USER);
        }

        Usuario salvo = usuarioRepository.save(usuario);

        return toOutputDTO(salvo);
    }
    public UsuarioOutputDTO login(LoginDTO login){

        Usuario usuario = usuarioRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean senhaCorreta = passwordEncoder.matches(login.getSenha(), usuario.getSenha());

        if (!passwordEncoder.matches(login.getSenha(), usuario.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha incorreta");
        }

        return toOutputDTO(usuario);
    }

    public UsuarioOutputDTO atualizar(Long usuarioId, UsuarioInputDTO dto) {

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                String.format("Usuário de id %d não encontrado", usuarioId)
                        )
                );

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        usuario.setSenha(passwordEncoder.encode(dto.getSenha()));

        usuario.setFotoUrl(dto.getFotoUrl());

        Usuario atualizado = usuarioRepository.save(usuario);

        return toOutputDTO(atualizado);
    }

    public void excluir(Long usuarioId) {
        try {
            usuarioRepository.deleteById(usuarioId);
        } catch (EmptyResultDataAccessException e) {
            throw new EntidadeNaoEncontradaException(
                    String.format("Usuário de id %d não encontrado", usuarioId)
            );
        }
    }

    private UsuarioOutputDTO toOutputDTO(Usuario usuario) {
        UsuarioOutputDTO dto = new UsuarioOutputDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setFotoUrl(usuario.getFotoUrl());
        dto.setRole(usuario.getRole().name());

        return dto;
    }

    public List<UsuarioOutputDTO> listarArtistas() {
        return usuarioRepository.findByRole(Usuario.Role.ARTISTA)
                .stream()
                .map(u -> {
                    UsuarioOutputDTO dto = new UsuarioOutputDTO();
                    dto.setId(u.getId());
                    dto.setNome(u.getNome());
                    dto.setFotoUrl(u.getFotoUrl());
                    dto.setEmail(u.getEmail());

                    return dto;
                })
                .toList();
    }

}
