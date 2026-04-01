package com.Berry.Gallery.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = "senha")
@Entity
@Table(name="tb_usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(length = 50, nullable = false,  unique = true)
    private String nome;

    @Column(length = 100)
    private String descricao;

    @Column(length = 50, nullable = false,  unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String fotoUrl;

    public enum Role {
        ADMIN,
        ARTISTA,
        USER
    }

    public Usuario() {
    }

}
