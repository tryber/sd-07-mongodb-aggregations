db.trips.aggregate(
  [
    {
      $group: {
        _id: { $dayOfWeek: "$startTime" },
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
        _diaDaSemana: "$_id",
        _id: 0,
        _total: "$total",
      },
    },
    {
      $project: {
        diaDaSemana: "$_diaDaSemana",
        total: "$_total",
      },
    },
  ],
);
