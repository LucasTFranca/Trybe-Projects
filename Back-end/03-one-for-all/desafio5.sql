CREATE VIEW top_2_hits_do_momento AS
SELECT (
SELECT nome FROM SpotifyClone.musicas
WHERE historico.musica_id = musicas.musica_id
) AS 'cancao',
COUNT(usuario_id) AS 'reproducoes'
FROM SpotifyClone.historico AS historico
GROUP BY musica_id
ORDER BY `reproducoes` DESC, `cancao`
LIMIT 2
