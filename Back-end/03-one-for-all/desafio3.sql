CREATE VIEW historico_reproducao_usuarios AS
SELECT (
SELECT nome FROM SpotifyClone.usuarios
WHERE historico.usuario_id = usuarios.usuario_id
) AS 'usuario',
(
SELECT nome FROM SpotifyClone.musicas
WHERE historico.musica_id = musicas.musica_id
) AS 'nome'
FROM SpotifyClone.historico AS historico
ORDER BY `usuario`, `nome`
