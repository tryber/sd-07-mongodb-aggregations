db.trips.aggregate([
  {
    $addFields: {
      diaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      diaSemana: 5,
    },
  },
  {
    $group: {
      _id: "$startStationName",
      numeroViagens: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: false,
      nomeEstacao: "$_id",
      total: "$numeroViagens",
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
