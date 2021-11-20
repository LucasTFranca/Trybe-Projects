const nomeEmpresa = "LATAM AIRLINES BRASIL";
db.resumoVoos.insertOne({
  empresa: nomeEmpresa,
  totalVoosDomesticos: db.voos
    .find({ "empresa.nome": nomeEmpresa, natureza: "Doméstica" })
    .count(),
});
db.resumoVoos.findOne({ empresa: nomeEmpresa }, { _id: 0 });
