db.trips.aggregate([
  {
    $match: {
      startTime: {
        $exists: true,
      },
    },
  },
  {
    $addFields: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: {
        nomeEstacao: "$startStationName",
        diaDaSemana: "$dayOfWeek",
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
