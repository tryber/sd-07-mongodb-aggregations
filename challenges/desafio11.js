db.getCollection("trips")
  .aggregate(
    { $project: {
      startDay: { $dayOfWeek: "$startTime" },
    },
    },
    { $group: {
      _id: "$startDay",
      total: { $sum: 1 },
    },
    },
    { $sort: { total: -1 } },
    { $limit: 1 },
    { $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total",
    },
    },
  );
