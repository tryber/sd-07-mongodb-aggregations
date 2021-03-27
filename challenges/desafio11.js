db.trips.aggregate([
  {
    $project: {
      weekDay: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$weekDay",
      total_de_viagens: { $sum: 1 },
    },
  },
  { $sort: { total_de_viagens: -1 } },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total_de_viagens",
    },
  },
]);
