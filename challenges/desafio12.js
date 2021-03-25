db.trips.aggregate([
  {
    $group: {
      _id: {
        startStationName: "$startStationName",
        startTime: { $dayOfWeek: "$startTime" },
      },
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$count",
    },
  },
  {
    $limit: 1,
  },
]);
