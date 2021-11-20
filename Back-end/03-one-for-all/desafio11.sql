CREATE VIEW cancoes_premium AS
SELECT (
SELECT nome FROM SpotifyClone.musicas
WHERE historico.musica_id = musicas.musica_id
) AS `nome`,
COUNT(usuario_id) AS `reproducoes`
FROM SpotifyClone.historico AS historico
JOIN usuarios USING (usuario_id)
WHERE usuarios.plano_id <> 1
GROUP BY historico.musica_id
ORDER BY `nome`
