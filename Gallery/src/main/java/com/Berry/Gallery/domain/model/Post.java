package com.Berry.Gallery.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Getter
@Setter
@Table(name="tb_posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String artistName;
    private String title;
    private String tecnica;
    private String type;
    private String style;
    private String theme;
    private String characterType;
    private String characterName;

    private int likes = 0;



    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] imagemUrl;


    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "galeria_id", nullable = true)
    private Galeria galeria;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

}
