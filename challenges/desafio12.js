db.trips.aggregate([
  {
    $addFields: {
      day: { $dayOfWeek: "$startTime" },
    },
  }, // feito com ajuda da pr @vanessanaara
  {
    $match:
    {
      day: 5,
    },
  },
  {
    $group:
    {
      _id:
      {
        day: "$day", nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort:
    {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project:
    {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$total",
    },
  },
]);
