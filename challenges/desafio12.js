db.trips.aggregate([
  {
    $addFields: {
      dia: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: {
        dia: "$dia",
        estacao: "$startStationName",
      },
      total: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.estacao",
      total: "$total",

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
