db.voos.find({ ano: { $lte: 2018, $gte: 2017 } }).count();
