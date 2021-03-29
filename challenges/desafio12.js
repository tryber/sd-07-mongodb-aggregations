db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaDaSemana",
        nomeEstacao: "$startStationName",
      }, // O agrupamento precisa ser feito por 2 campos
      total: {
        $sum: 1,
      },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
]);
