package com.Berry.Gallery.api.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter
public class PostInputDTO {
    private String artistName;
    private String title;
    private LocalDate creationDate;
    private String tecnica;
    private String type;
    private String style;
    private String theme;
    private String characterType;
    private String characterName;
    private String description;
    private Long galleryId;
    private Long userId;
}


