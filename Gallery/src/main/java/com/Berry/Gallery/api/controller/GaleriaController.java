package com.Berry.Gallery.api.controller;

import com.Berry.Gallery.api.dto.GaleriaInputDTO;
import com.Berry.Gallery.api.dto.GaleriaOutputDTO;
import com.Berry.Gallery.domain.service.GaleriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/galerias")
@CrossOrigin(origins = "*")
public class GaleriaController {

    @Autowired
    private GaleriaService galeriaService;

    @GetMapping
    public List<GaleriaOutputDTO> listar() {
        return galeriaService.listar();
    }

    @GetMapping("/{galeriaId}")
    public GaleriaOutputDTO buscar(@PathVariable Long galeriaId) {
        return galeriaService.buscar(galeriaId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GaleriaOutputDTO adicionar(@RequestBody GaleriaInputDTO dto) {
        return galeriaService.salvar(dto);
    }

    @PutMapping("/{galeriaId}")
    public GaleriaOutputDTO atualizar(
            @PathVariable Long galeriaId,
            @RequestBody GaleriaInputDTO dto
    ) {
        return galeriaService.atualizar(galeriaId, dto);
    }

    @DeleteMapping("/{galeriaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long galeriaId) {
        galeriaService.excluir(galeriaId);
    }
}

