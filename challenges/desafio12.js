db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $max: {
          $dayOfWeek: "$startTime",
        },
      },
    },
  },
  {
    $group: {
      _id: {
        diaDaSemana: "$diaDaSemana",
        startStationName: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  { $limit: 1 },
  {
    $project: {
      nomeEstacao: "$_id.startStationName",
      _id: 0,
      total: "$total",
    },
  },
]);
