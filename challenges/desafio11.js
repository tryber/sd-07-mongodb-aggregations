db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    contador: { $sum: 1 },
  } },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$contador",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
