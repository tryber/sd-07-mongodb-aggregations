db.trips.aggregate([
  {
    $match: {
      startTime: { $exists: 1 },
    },
  },
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaDaSemana",
        stations: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stations",
      total: "$total",
    },
  },
]);
