db.trips.aggregate([
  {
    $group: {
      count: { $sum: 1 },
      _id: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$count",
      _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
