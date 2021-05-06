db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      quantidade: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      diaDaSemana: "$_id",
      total: "$quantidade",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
