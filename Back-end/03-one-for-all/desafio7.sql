CREATE VIEW perfil_artistas AS
SELECT (
SELECT nome
FROM SpotifyClone.artistas
WHERE albuns.artista_id = artistas.artista_id
) AS `artista`,
nome AS `album`, (
SELECT COUNT(usuario_id)
FROM SpotifyClone.seguidores
WHERE albuns.artista_id = seguidores.artista_id
GROUP BY artista_id
) AS `seguidores`
FROM SpotifyClone.albuns AS albuns
ORDER BY `seguidores` DESC, `artista`, `album`
