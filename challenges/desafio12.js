db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      diaDaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalSoma: { $sum: 1 },
    },
  },
  {
    $sort: { totalSoma: -1 },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalSoma",
    },
  },
  { $limit: 1 },
]);
