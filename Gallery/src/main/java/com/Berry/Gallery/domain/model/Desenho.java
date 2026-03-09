package com.Berry.Gallery.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;


@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name="tb_desenhos")
public class Desenho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;


    @Column(name = "imagem_url")
    private String imagemUrl;

    @Column(name="titulo",length = 100, nullable = false)
    private String titulo;

    @ManyToOne
    @JoinColumn(name = "artista_id")
    private Usuario artista;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_criacao")
    private LocalDate dataCriacao;

    @Column(name = "nome_personagem")
    private String nome_personagem;

    public Desenho(Long desenhoId) {
    }

    @ManyToOne
    @JoinColumn(name = "personagem_id")
    private Personagem personagem;

    @ManyToOne
    @JoinColumn(name = "tecnica_id")
    private Tecnica tecnica;

    @ManyToOne
    @JoinColumn(name = "estilo_id")
    private Estilo estilo;

    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "galeria_id", nullable = false)
    private Galeria galeria;

    @ManyToOne
    @JoinColumn(name = "tema_id", nullable = false)
    private Tema tema;

    public Desenho() {

    }
}

