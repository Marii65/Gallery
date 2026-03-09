-- =========================
-- USUARIO
-- =========================
INSERT INTO tb_usuarios (nome, email,foto_url, senha, role)
VALUES ('Mari', 'mari@email.com','foto.png', '123456', 'ARTISTA');

-- =========================
-- ESTILO
-- =========================
INSERT INTO tb_estilos (nome)
VALUES ('Anime');

-- =========================
-- TECNICA
-- =========================
INSERT INTO tb_tecnicas (nome)
VALUES ('Digital');

-- =========================
-- TEMA
-- =========================
INSERT INTO tb_temas (nome)
VALUES ('Fantasia');

-- =========================
-- TIPO
-- =========================
INSERT INTO tb_tipos (nome)
VALUES ('Concept Art');

-- =========================
-- PERSONAGEM
-- =========================
INSERT INTO tb_personagens (nome_personagem, imagem_url)
VALUES ('Elfa da Floresta', 'https://img.berry.com/personagens/elfa.png');

-- =========================
-- GALERIA
-- =========================
INSERT INTO tb_galerias (nome, descricao, data_criacao, usuario_id)
VALUES (
           'Galeria Principal',
           'Galeria inicial do artista',
           '2024-01-01',
           1
       );

-- =========================
-- DESENHO
-- =========================
INSERT INTO tb_desenhos
(
    imagem_url,
    titulo,
    artista,
    descricao,
    data_criacao,
    nome_personagem,
    personagem_id,
    tecnica_id,
    estilo_id,
    tipo_id,
    galeria_id,
    tema_id
)
VALUES (
           'https://img.berry.com/desenhos/teste.png',
           'Desenho Teste',
           'Mari',
           'Primeiro desenho cadastrado',
           '2024-02-01',
           'Elfa da Floresta',
           1,
           1,
           1,
           1,
           1,
           1
       );

-- =========================
-- FAVORITO
-- =========================
INSERT INTO tb_favoritos (usuario_id, desenho_id)
VALUES (1, 1);
