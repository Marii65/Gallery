package com.Berry.Gallery.api.dto;

import com.Berry.Gallery.domain.model.Favorito;

public class FavoritoOutputDTO {

    private Long id;
    private Long postId;
    private String title;

    public FavoritoOutputDTO(Favorito favorito) {
        this.id = favorito.getId();
        this.postId = favorito.getPost().getId();
        this.title = favorito.getPost().getTitle();
    }

    public Long getId() {
        return id;
    }

    public Long getPostId() {
        return postId;
    }

    public String getTitle() {
        return title;
    }
}