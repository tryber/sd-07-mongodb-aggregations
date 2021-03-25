db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: { diaSemana: "$diaDaSemana", nomeEstacao: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  {
    $group: {
      _id: "$_id.diaSemana",
      estacaoViagens: { $push: {
        nomeEstacao: "$_id.nomeEstacao",
        total: "$total",
      } },
      total: { $sum: "$total" },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $unwind: "$estacaoViagens" },
  { $sort: { "estacaoViagens.total": -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$estacaoViagens.nomeEstacao",
      total: "$estacaoViagens.total",
    },
  },
]);
