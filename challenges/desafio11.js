db.trips.aggregate([
  {
    $addFields: {
      start_day: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$start_day",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
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
