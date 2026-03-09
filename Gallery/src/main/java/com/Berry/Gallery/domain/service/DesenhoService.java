package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.domain.exceptions.EntidadeNaoEncontradaException;
import com.Berry.Gallery.domain.model.*;
import com.Berry.Gallery.domain.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class DesenhoService {

    @Autowired
    private DesenhoRepository desenhoRepository;

    public List<Desenho> listar() {
        return desenhoRepository.findAll();
    }
    public List<Desenho> listarOrdenadoPorData(String direcao) {

        Sort sort = direcao.equalsIgnoreCase("asc")
                ? Sort.by("dataCriacao").ascending()
                : Sort.by("dataCriacao").descending();

        return desenhoRepository.findAll(sort);
    }

    public Desenho buscar(Long desenhoId) {
        return desenhoRepository.findById(desenhoId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException(
                                String.format("Desenho de id %d não encontrado", desenhoId)
                        )
                );
    }


    public Desenho salvar(Desenho desenho) {
        return desenhoRepository.save(desenho);
    }


    public void excluir(Long desenhoId) {
        try {
            desenhoRepository.deleteById(desenhoId);
        } catch (EmptyResultDataAccessException e) {
            throw new EntidadeNaoEncontradaException(
                    String.format("Desenho de id %d não encontrado", desenhoId)
            );
        }
    }


    public List<Desenho> filtrar(
            Long estiloId,
            Long tecnicaId,
            Long temaId,
            Long tipoId,
            Long personagemId,
            Long galeriaId
    ) {
        return desenhoRepository.filtrar(
                estiloId,
                tecnicaId,
                temaId,
                tipoId,
                personagemId,
                galeriaId
        );
    }
}
