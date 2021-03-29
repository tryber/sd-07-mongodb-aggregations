db.getCollection("trips")
  .aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$startTime" },
        diaDaSemana: {
          $max: { $dayOfWeek: "$startTime" },
        },
        total: {
          $sum: 1,
        },
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
    {
      $project: {
        _id: false,
      },
    },
  ]);
