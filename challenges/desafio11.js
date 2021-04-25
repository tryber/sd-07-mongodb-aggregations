db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: { $max: "$startTime" } },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",

    },
  },
]);
