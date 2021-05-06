db.trips.aggregate([
  {
    $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, 5] } },
  },
  {
    $group: {
      count: { $sum: 1 },
      _id: "$startStationName",
    },
  },
  { $sort: { count: -1 } },
  {
    $project: {
      nomeEstacao: "$_id",
      total: "$count",
      _id: 0,
    },
  },
  { $limit: 1 },
]);
