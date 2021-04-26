db.trips.aggregate([
  { $project: {
    dia: { $dayOfWeek: "$startTime" },
  },
  },
  { $group: {
    _id: "$dia",
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
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);
