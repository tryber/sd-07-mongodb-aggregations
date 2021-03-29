db.trips.aggregate([
  { $match: { startStationName: { $exists: true } } },
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
      },
      dias: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$dias",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
