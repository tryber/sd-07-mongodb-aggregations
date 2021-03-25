db.trips.aggregate([
  {
    $project: {
      inicio: "$startTime",
      dia: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dia",
      qtde: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$qtde",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
