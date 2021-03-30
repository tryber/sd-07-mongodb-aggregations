db.trips.aggregate(
  [
    {
      $match: {
        startTime: { $exists: true },
      },
    },

    {
      $addFields: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
      },
    },

    {
      $group: {
        _id: {
          diaDaSemana: "$diaDaSemana",
          stations: "$startStationName",
        },
        total: { $sum: 1 },
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
        nomeEstacao: "$_id.stations",
        total: "$total",
      },
    },

  ],
);
