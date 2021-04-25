db.getCollection("trips")
  .aggregate(
    {
      $project: {
        startDay: { $dayOfWeek: "$startTime" },
        startStationName: 1,
      },
    },
    {
      $match: {
        startDay: 5,
      },
    },
    {
      $group: {
        _id: "$startStationName",
        total: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
    {
      $project: {
        _id: 0,
        nomeEstacao: "$_id",
        total: "$total",
      },
    },
    { $limit: 1 },
  );
