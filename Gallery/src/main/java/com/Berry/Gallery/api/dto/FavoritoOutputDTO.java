package com.Berry.Gallery.api.dto;

public class FavoritoOutputDTO {
    private Long id;
    private Long usuarioId;
    private Long desenhoId;
    private String nomeDesenho;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getDesenhoId() {
        return desenhoId;
    }

    public void setDesenhoId(Long desenhoId) {
        this.desenhoId = desenhoId;
    }

    public String getNomeDesenho() {
        return nomeDesenho;
    }

    public void setNomeDesenho(String nomeDesenho) {
        this.nomeDesenho = nomeDesenho;
    }
}
