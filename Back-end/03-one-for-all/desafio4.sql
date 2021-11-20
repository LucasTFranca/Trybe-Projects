CREATE VIEW top_3_artistas AS
SELECT (
SELECT nome
FROM SpotifyClone.artistas
WHERE seguidores.artista_id = artistas.artista_id
) AS 'artista', 
COUNT(usuario_id) AS 'seguidores'
FROM SpotifyClone.seguidores
GROUP BY artista_id
ORDER BY `seguidores` DESC, `artista`
LIMIT 3
