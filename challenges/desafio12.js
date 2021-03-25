db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $match: {
      day: 5,
    },
  },
  {
    $group: {
      _id: { nomeDaEstacao: "$startStationName", dia: "$day" },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeDaEstacao",
      total: "$total",
    },
  },
  { $limit: 1 },
]);
