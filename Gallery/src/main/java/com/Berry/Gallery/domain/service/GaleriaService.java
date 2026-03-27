package com.Berry.Gallery.domain.service;

import com.Berry.Gallery.api.dto.GaleriaInputDTO;
import com.Berry.Gallery.api.dto.GaleriaOutputDTO;
import com.Berry.Gallery.domain.exceptions.EntidadeNaoEncontradaException;
import com.Berry.Gallery.domain.model.Galeria;
import com.Berry.Gallery.domain.model.Usuario;
import com.Berry.Gallery.domain.repository.GaleriaRepository;
import com.Berry.Gallery.domain.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Transactional
public class GaleriaService {

    @Autowired
    private GaleriaRepository galeriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<GaleriaOutputDTO> listarPorUsuario(Long id) {
        return galeriaRepository.findByUsuarioId(id)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<GaleriaOutputDTO> listarTodas() {
        return galeriaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public GaleriaOutputDTO buscar(Long galeriaId) {
        Galeria galeria = galeriaRepository.findById(galeriaId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Galeria não encontrada")
                );

        return toDTO(galeria);
    }

    public GaleriaOutputDTO salvar(GaleriaInputDTO dto) {

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Usuário não encontrado")
                );

        Galeria galeria = new Galeria();
        galeria.setNome(dto.getNome());
        galeria.setDescricao(dto.getDescricao());
        galeria.setUsuario(usuario);

        return toDTO(galeriaRepository.save(galeria));
    }

    public GaleriaOutputDTO atualizar(Long galeriaId, GaleriaInputDTO dto) {

        Galeria galeria = galeriaRepository.findById(galeriaId)
                .orElseThrow(() ->
                        new EntidadeNaoEncontradaException("Galeria não encontrada")
                );

        galeria.setNome(dto.getNome());
        galeria.setDescricao(dto.getDescricao());

        return toDTO(galeriaRepository.save(galeria));
    }

    public void excluir(Long galeriaId) {
        galeriaRepository.deleteById(galeriaId);
    }

    private GaleriaOutputDTO toDTO(Galeria galeria) {
        GaleriaOutputDTO dto = new GaleriaOutputDTO();
        dto.setId(galeria.getId());
        dto.setNome(galeria.getNome());
        dto.setDescricao(galeria.getDescricao());
        dto.setUsuarioId(galeria.getUsuario().getId());
        dto.setNomeUsuario(galeria.getUsuario().getNome());
        return dto;
    }
}

