db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDasemana: "$diaDaSemana",
        nomeEstacao: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
