db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $match: {
      diaDaSemana: { $eq: 5 },
    },
  },
  {
    $group: {
      _id: "$startStationName",
      totalViagens: { $sum: 1 },
    },
  },
  {
    $sort: { totalViagens: -1 },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: "$totalViagens",
    },
  },
  {
    $limit: 1,
  },
]);
