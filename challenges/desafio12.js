db.trips.aggregate([
  {
    $project: {
      inicio: "$startTime",
      dia: { $dayOfWeek: "$startTime" },
      nome: "$startStationName",
    },
  },
  { $match: { dia: 5 } },
  {
    $group: {
      _id: {
        name: "$nome",
        day: "$dia",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.name",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
