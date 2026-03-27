package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.PersonagemInputDTO;
import com.Berry.Gallery.domain.exceptions.EntidadeNaoEncontradaException;
import com.Berry.Gallery.domain.model.Personagem;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.PersonagemRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
public class PersonagemService {

    @Autowired
    private PersonagemRepository personagemRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Personagem> listarTodas() {
        return personagemRepository.findAll();
    }

    public List<Personagem> listarPorUsuario(Long userId) {
        return personagemRepository.findByUsuarioId(userId);
    }

    public Personagem buscar(Long id) {
        return personagemRepository.findById(id)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Personagem não encontrado"));
    }

    public Personagem salvar(PersonagemInputDTO dto, MultipartFile imagem) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Personagem personagem = new Personagem();

        personagem.setNome(dto.getNome());
        personagem.setDescricao(dto.getDescricao());
        personagem.setUsuario(usuario);

        if (imagem != null && !imagem.isEmpty()) {

            String tipo = imagem.getContentType();

            if (!tipo.equals("image/jpeg") && !tipo.equals("image/png")) {
                throw new RuntimeException("Apenas arquivos JPG ou PNG são permitidos");
            }

            try {
                personagem.setImagemUrl(imagem.getBytes());
            } catch (Exception e) {
                throw new RuntimeException("Erro ao processar imagem");
            }
        }

        return personagemRepository.save(personagem);
    }

    public Personagem atualizar(Long id, Personagem novo) {

        Personagem personagem = buscar(id);

        personagem.setNome(novo.getNome());
        personagem.setImagemUrl(novo.getImagemUrl());

        return personagemRepository.save(personagem);
    }

    public void excluir(Long id) {
        personagemRepository.deleteById(id);
    }




}