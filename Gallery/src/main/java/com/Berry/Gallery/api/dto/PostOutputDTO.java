package com.Berry.Gallery.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PostOutputDTO {
    private Long id;
    private String title;
    private String imageUrl;
    // Adicione outros campos que deseja mostrar na galeria
}
