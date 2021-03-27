db.trips.aggregate([
  {
    $project: {
      weekDay: { $dayOfWeek: "$startTime" },
      station: "$startStationName",
    },
  },
  { $match: { weekDay: 5 } },
  {
    $group: {
      _id: {
        weekDay: "$weekDay",
        station: "$station",
      },
      total_de_viagens: { $sum: 1 },
    },
  },
  {
    $sort: { total_de_viagens: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$total_de_viagens",
    },
  },
]);
